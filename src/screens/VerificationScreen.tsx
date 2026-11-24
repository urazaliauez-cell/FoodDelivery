import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Verification">;

export default function VerificationScreen({ navigation, route }: Props) {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  function verify() {
    if (code !== "1234") {
      setError("Incorrect verification code.");
      return;
    }

    navigation.navigate("ResetPassword", { email: route.params.email });
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>Enter the verification code for</Text>
        <Text style={styles.email}>{route.params.email}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.label}>CODE</Text>
          <TouchableOpacity disabled={seconds > 0} onPress={() => { setSeconds(30); setCode(""); setError(""); }}>
            <Text style={{ color: seconds > 0 ? COLORS.muted : COLORS.primary }}>
              {seconds > 0 ? `Resend in ${seconds}s` : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxes}>
          {[0, 1, 2, 3].map(i => (
            <View key={i} style={styles.box}>
              <Text style={styles.digit}>{code[i] || "-"}</Text>
            </View>
          ))}

          <TextInput
            style={styles.hiddenInput}
            value={code}
            onChangeText={v => { setCode(v.replace(/[^0-9]/g, "").slice(0, 4)); setError(""); }}
            keyboardType="number-pad"
            maxLength={4}
            autoFocus
            accessibilityLabel="Verification code"
          />
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <CustomButton title="Verify" onPress={verify} disabled={code.length !== 4} />

        <Text style={styles.demo}>Demo verification code: 1234</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.dark },
  header: { height: 220, alignItems: "center", justifyContent: "center" },
  back: { position: "absolute", top: 15, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30, fontWeight: "800", color: COLORS.white },
  subtitle: { color: "#C5C5D0", marginTop: 10 },
  email: { color: COLORS.white, fontWeight: "600", marginTop: 5 },
  form: { flex: 1, backgroundColor: COLORS.white, padding: 25, paddingTop: 35, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  label: { fontWeight: "600", color: COLORS.text },
  boxes: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  box: { width: "22%", height: 65, borderRadius: 12, backgroundColor: COLORS.input, alignItems: "center", justifyContent: "center" },
  digit: { fontSize: 25, fontWeight: "700", color: COLORS.dark },
  hiddenInput: { position: "absolute", width: "100%", height: "100%", opacity: 0.02 },
  error: { color: COLORS.error, marginBottom: 10 },
  demo: { color: COLORS.muted, textAlign: "center", marginTop: 20 },
});
