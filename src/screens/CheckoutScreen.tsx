import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ScreenHeader from "../components/ScreenHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function CheckoutScreen({ navigation }: Props) {
  const { total, items, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [method, setMethod] = useState("Cash");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const delivery = total >= 5000 ? 0 : 500;
  const discountAmount = discount ? Math.round(total * 0.25) : 0;
  const finalTotal = total + delivery - discountAmount;

  function applyPromo() {
    const valid = promo.trim().toUpperCase() === "FOOD25";
    setDiscount(valid);
    setMessage(valid ? "25% discount applied!" : "Invalid promo code.");
  }

  async function placeOrder() {
    if (!user || !address.trim() || phone.replace(/\D/g, "").length < 10 || !items.length) {
      setMessage("Enter a valid address and phone number.");
      return;
    }

    setLoading(true);

    try {
      const id = Date.now().toString().slice(-8);
      const key = `food_orders_${user.email}`;
      const saved = await AsyncStorage.getItem(key);
      const orders = saved ? JSON.parse(saved) : [];

      await AsyncStorage.setItem(key, JSON.stringify([
        { id, total: finalTotal, date: new Date().toLocaleDateString(), status: "Confirmed", items, method, address },
        ...orders
      ]));

      setOrderId(id);
      clearCart();
      setSuccess(true);
    } catch {
      setMessage("Unable to save order.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <SafeAreaView style={styles.success}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={120} color={COLORS.success} />
        </View>
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.description}>Your demo order has been placed successfully.</Text>
        <Text style={styles.order}>Order #{orderId}</Text>
        <CustomButton title="Back to Home" style={{ width: "100%" }} onPress={() => navigation.reset({ index: 0, routes: [{ name: "Main", params: { screen: "Home" } }] })} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Checkout" onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <CustomInput label="Delivery Address" value={address} onChangeText={setAddress} placeholder="Your address" />
        <CustomInput label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+7 777 000 00 00" />

        <Text style={styles.heading}>Payment Method</Text>

        {["Cash", "Card (Demo)", "Kaspi (Demo)"].map(item => (
          <TouchableOpacity key={item} onPress={() => setMethod(item)} style={[styles.payment, method === item && styles.selected]}>
            <Ionicons name={item === "Cash" ? "cash-outline" : "card-outline"} size={26} color={COLORS.primary} />
            <Text style={{ flex: 1, fontWeight: "600" }}>{item}</Text>
            <Ionicons name={method === item ? "radio-button-on" : "radio-button-off"} size={22} color={COLORS.primary} />
          </TouchableOpacity>
        ))}

        <Text style={styles.heading}>Promo Code</Text>
        <CustomInput placeholder="Enter FOOD25" value={promo} onChangeText={setPromo} autoCapitalize="characters" />
        <CustomButton title="Apply Promo" outline onPress={applyPromo} />

        {!!message && <Text style={{ color: message.includes("applied") ? COLORS.success : COLORS.error, marginVertical: 12 }}>{message}</Text>}

        <View style={styles.summary}>
          <View style={styles.row}><Text>Subtotal</Text><Text>{total} ₸</Text></View>
          <View style={styles.row}><Text>Delivery</Text><Text>{delivery} ₸</Text></View>
          <View style={styles.row}><Text>Discount</Text><Text>-{discountAmount} ₸</Text></View>
          <View style={styles.line} />
          <View style={styles.row}><Text style={styles.heading}>Total</Text><Text style={styles.total}>{finalTotal} ₸</Text></View>
        </View>

        <Text style={styles.note}>This is a demo checkout. No real payment will be charged.</Text>
      </ScrollView>

      <CustomButton title={`Confirm Order - ${finalTotal} ₸`} onPress={placeOrder} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: 20 },
  heading: { fontSize: 17, fontWeight: "700", color: COLORS.dark, marginVertical: 12 },
  payment: { flexDirection: "row", alignItems: "center", gap: 12, padding: 18, borderRadius: 13, borderWidth: 1, borderColor: COLORS.border, marginBottom: 12 },
  selected: { borderColor: COLORS.primary, backgroundColor: "#FFF5EC" },
  summary: { backgroundColor: COLORS.input, padding: 18, borderRadius: 16, marginTop: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 7 },
  line: { height: 1, backgroundColor: "#D5D5D5", marginVertical: 10 },
  total: { fontSize: 24, fontWeight: "800", color: COLORS.primary },
  note: { color: COLORS.muted, fontSize: 12, marginVertical: 15, lineHeight: 20 },
  success: { flex: 1, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center", padding: 30 },
  successIcon: { width: 180, height: 180, borderRadius: 90, backgroundColor: "#EAFBF0", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 30, fontWeight: "800", marginTop: 30, color: COLORS.dark },
  description: { textAlign: "center", color: COLORS.muted, marginVertical: 15, lineHeight: 24 },
  order: { fontSize: 18, fontWeight: "700", marginBottom: 25 },
});
