import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "ResetPassword">;

export default function ResetPasswordScreen({ navigation, route }: Props) {
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submit() {
    setError("");

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
      const result = await resetPassword(route.params.email, password);
      if (result) setSuccess(true);
      else setError("Account not found.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={COLORS.dark} />
          </TouchableOpacity>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Create a new password</Text>
        </View>

        <View style={styles.form}>
          {success ? (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="checkmark-circle" size={95} color={COLORS.success} />
              <Text style={styles.success}>Password changed successfully!</Text>
              <CustomButton title="Log In" style={{ width: "100%" }} onPress={() => navigation.reset({ index: 0, routes: [{ name: "Login" }] })} />
            </View>
          ) : (
            <>
              <CustomInput label="New Password" password value={password} onChangeText={setPassword} placeholder="New password" />
              <CustomInput label="Confirm Password" password value={confirm} onChangeText={setConfirm} placeholder="Confirm password" />
              {!!error && <Text style={styles.error}>{error}</Text>}
              <CustomButton title="Reset Password" onPress={submit} loading={loading} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.dark },
  header: { height: 210, alignItems: "center", justifyContent: "center" },
  back: { position: "absolute", top: 15, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 29, fontWeight: "800", color: COLORS.white },
  subtitle: { color: "#C5C5D0", marginTop: 10 },
  form: { flex: 1, backgroundColor: COLORS.white, padding: 25, paddingTop: 35, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  error: { color: COLORS.error, marginBottom: 12 },
  success: { fontSize: 20, fontWeight: "700", textAlign: "center", marginVertical: 25 },
});
