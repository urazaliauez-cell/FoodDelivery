import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirm) {
      setError("Please complete all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const success = await register(name, email, password);

      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Location" }],
        });
      } else {
        setError("This email is already registered.");
      }
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={23} color={COLORS.dark} />
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Please sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <CustomInput label="Name" placeholder="John Doe" value={name} onChangeText={setName} />
          <CustomInput label="Email" placeholder="example@gmail.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <CustomInput label="Password" placeholder="Enter password" password value={password} onChangeText={setPassword} />
          <CustomInput label="Re-type Password" placeholder="Confirm password" password value={confirm} onChangeText={setConfirm} />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <CustomButton title="Sign Up" onPress={submit} loading={loading} />

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.login}>Already have an account? <Text style={{ color: COLORS.primary }}>Log In</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.dark },
  header: { height: 190, alignItems: "center", justifyContent: "center" },
  back: { position: "absolute", top: 15, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 32, color: COLORS.white, fontWeight: "800" },
  subtitle: { color: "#C5C5D0", marginTop: 10 },
  form: { flex: 1, padding: 25, paddingTop: 30, backgroundColor: COLORS.white, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  error: { color: COLORS.error, marginBottom: 12 },
  login: { textAlign: "center", marginTop: 20, color: COLORS.muted },
});
