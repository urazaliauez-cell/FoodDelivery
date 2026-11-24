import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Location" }],
        });
      } else {
        setError("Incorrect email or password.");
      }
    } catch {
      setError("Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.decoration} />
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>
            Please sign in to your existing account
          </Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="Email"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            password
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.remember}
              onPress={() => setRemember(!remember)}
            >
              <Ionicons
                name={remember ? "checkbox" : "square-outline"}
                color={remember ? COLORS.primary : COLORS.muted}
                size={20}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.link}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <CustomButton
            title="Log In"
            loading={loading}
            onPress={handleLogin}
          />

          <View style={styles.signup}>
            <Text style={styles.rememberText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.link}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.info}>
            Welcome to Food Delivery
          </Text>

          <View style={styles.logo}>
            <Ionicons name="restaurant-outline" size={36} color={COLORS.primary} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  header: {
    height: 210,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  decoration: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#303044",
    top: -110,
    left: -70,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.white,
  },
  subtitle: {
    color: "#C5C5D0",
    fontSize: 14,
    marginTop: 10,
  },
  form: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 25,
    paddingTop: 35,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rememberText: {
    color: COLORS.muted,
    fontSize: 13,
  },
  link: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  signup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 25,
  },
  error: {
    color: COLORS.error,
    marginBottom: 12,
    fontSize: 13,
  },
  info: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 35,
  },
  logo: {
    alignSelf: "center",
    backgroundColor: "#FFF0DF",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});
