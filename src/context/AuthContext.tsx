import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Account extends User {
  password: string;
}

interface AuthType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  resetPassword: (email: string, password: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthType | undefined>(undefined);

async function getAccounts(): Promise<Account[]> {
  const data = await AsyncStorage.getItem("food_accounts");
  return data ? JSON.parse(data) : [];
}

function publicUser(account: Account): User {
  const { password, ...user } = account;
  return user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("food_user")
      .then(data => {
        if (data) setUser(JSON.parse(data));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function saveUser(value: User) {
    await AsyncStorage.setItem("food_user", JSON.stringify(value));
    setUser(value);
  }

  async function login(email: string, password: string) {
    const accounts = await getAccounts();
    const account = accounts.find(
      a => a.email === email.trim().toLowerCase() && a.password === password
    );

    if (!account) return false;

    await saveUser(publicUser(account));
    return true;
  }

  async function register(name: string, email: string, password: string) {
    const accounts = await getAccounts();
    const normalizedEmail = email.trim().toLowerCase();

    if (accounts.some(a => a.email === normalizedEmail)) return false;

    const account: Account = {
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: "",
      address: "",
    };

    await AsyncStorage.setItem(
      "food_accounts",
      JSON.stringify([...accounts, account])
    );

    await saveUser(publicUser(account));
    return true;
  }

  async function resetPassword(email: string, password: string) {
    const accounts = await getAccounts();
    const normalizedEmail = email.trim().toLowerCase();

    if (!accounts.some(a => a.email === normalizedEmail)) return false;

    const updated = accounts.map(a =>
      a.email === normalizedEmail ? { ...a, password } : a
    );

    await AsyncStorage.setItem("food_accounts", JSON.stringify(updated));
    return true;
  }

  async function updateProfile(data: Partial<User>) {
    if (!user) return;

    const updated = { ...user, ...data, email: user.email };
    const accounts = await getAccounts();

    await AsyncStorage.setItem(
      "food_accounts",
      JSON.stringify(accounts.map(a =>
        a.email === user.email ? { ...a, ...updated } : a
      ))
    );

    await saveUser(updated);
  }

  async function logout() {
    await AsyncStorage.removeItem("food_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, resetPassword, updateProfile, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider is missing");
  return context;
}
