import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Location">;

export default function LocationScreen({ navigation }: Props) {
  const { user, updateProfile } = useAuth();
  const [city, setCity] = useState("Almaty");
  const [address, setAddress] = useState(user?.address || "");
  const [error, setError] = useState("");
  const cities = ["Almaty", "Astana", "Shymkent", "Karaganda"];

  async function submit() {
    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    try {
      await updateProfile({ address: address.startsWith(city + ",") ? address : `${city}, ${address}` });
      navigation.reset({ index: 0, routes: [{ name: "Main" }] });
    } catch {
      setError("Unable to save address.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.map}>
          <View style={styles.road1} />
          <View style={styles.road2} />
          <View style={styles.road3} />
          <Ionicons name="location" size={100} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Your Location</Text>
        <Text style={styles.subtitle}>Choose where you want your food delivered.</Text>

        <Text style={styles.label}>SELECT CITY</Text>

        <View style={styles.cities}>
          {cities.map(item => (
            <TouchableOpacity key={item} onPress={() => setCity(item)} style={[styles.city, city === item && styles.selected]}>
              <Text style={{ color: city === item ? COLORS.white : COLORS.text, fontWeight: "600" }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomInput label="Delivery Address" placeholder="Street, building, apartment" value={address} onChangeText={setAddress} error={error} />

        <CustomButton title="Confirm Location" onPress={submit} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: 25 },
  map: { width: 220, height: 220, borderRadius: 110, backgroundColor: "#EAF2E7", alignSelf: "center", alignItems: "center", justifyContent: "center", overflow: "hidden", marginVertical: 30 },
  road1: { position: "absolute", width: 280, height: 16, backgroundColor: "#FFD65C", transform: [{ rotate: "-25deg" }] },
  road2: { position: "absolute", width: 16, height: 280, backgroundColor: COLORS.white, transform: [{ rotate: "-25deg" }] },
  road3: { position: "absolute", width: 280, height: 12, top: 55, backgroundColor: COLORS.white, transform: [{ rotate: "25deg" }] },
  title: { fontSize: 27, fontWeight: "800", textAlign: "center", color: COLORS.dark },
  subtitle: { textAlign: "center", color: COLORS.muted, lineHeight: 23, marginVertical: 15 },
  label: { fontSize: 12, fontWeight: "700", marginTop: 15 },
  cities: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginVertical: 15 },
  city: { paddingHorizontal: 20, paddingVertical: 13, borderRadius: 12, backgroundColor: COLORS.input },
  selected: { backgroundColor: COLORS.primary },
});
