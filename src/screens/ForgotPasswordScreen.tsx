import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function sendCode() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }

    navigation.navigate("Verification", { email: email.trim().toLowerCase() });
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={COLORS.dark} />
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Enter your email to reset your password</Text>
        </View>

        <View style={styles.form}>
          <CustomInput label="Email" placeholder="example@gmail.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" error={error} />
          <CustomButton title="Send Code" onPress={sendCode} />

          <View style={styles.icon}>
            <Ionicons name="lock-closed-outline" size={55} color={COLORS.primary} />
          </View>

          <Text style={styles.info}>We will help you recover access to your account.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.dark },
  header: { height: 210, alignItems: "center", justifyContent: "center" },
  back: { position: "absolute", top: 15, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "800", color: COLORS.white },
  subtitle: { color: "#C5C5D0", marginTop: 12, fontSize: 13 },
  form: { flex: 1, backgroundColor: COLORS.white, padding: 25, paddingTop: 35, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  icon: { alignSelf: "center", width: 120, height: 120, borderRadius: 60, backgroundColor: "#FFF0DF", alignItems: "center", justifyContent: "center", marginTop: 40 },
  info: { textAlign: "center", color: COLORS.muted, marginTop: 20, lineHeight: 23 },
});
