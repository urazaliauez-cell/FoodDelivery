import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList, RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import QuantitySelector from "../components/QuantitySelector";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Cart">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function CartScreen({ navigation }: Props) {
  const { items, total, count, increase, decrease, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="chevron-back" size={23} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Cart ({count})</Text>
        <TouchableOpacity onPress={clearCart}><Text style={styles.edit}>CLEAR ALL</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        {items.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="bag-outline" size={90} color={COLORS.primary} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <CustomButton title="Explore Food" onPress={() => navigation.navigate("Home")} style={{ width: "100%" }} />
          </View>
        )}

        {items.map(item => (
          <View key={item.food.id} style={styles.item}>
            <Image source={{ uri: item.food.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.food.name}</Text>
              <Text style={styles.price}>{item.food.price * item.quantity} ₸</Text>
              <View style={styles.controls}>
                <QuantitySelector quantity={item.quantity} onIncrease={() => increase(item.food.id)} onDecrease={() => decrease(item.food.id)} />
                <TouchableOpacity onPress={() => removeFromCart(item.food.id)}>
                  <Ionicons name="trash-outline" size={22} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Text style={styles.label}>DELIVERY ADDRESS</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Location")}>
              <Text style={styles.edit}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.address}><Text style={{ color: COLORS.text }}>{user?.address || "Select address"}</Text></View>

          <View style={styles.row}>
            <Text style={styles.label}>TOTAL:</Text>
            <Text style={styles.total}>{total} ₸</Text>
          </View>

          <CustomButton title="Place Order" onPress={() => navigation.navigate("Checkout")} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.dark },
  header: { flexDirection: "row", alignItems: "center", padding: 20, gap: 12 },
  back: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#303044", alignItems: "center", justifyContent: "center" },
  title: { flex: 1, fontSize: 23, color: COLORS.white, fontWeight: "700" },
  edit: { color: COLORS.primary, fontSize: 12, fontWeight: "700" },
  item: { flexDirection: "row", gap: 15, marginBottom: 25 },
  image: { width: 100, height: 110, borderRadius: 20 },
  name: { color: COLORS.white, fontSize: 16, fontWeight: "600" },
  price: { color: COLORS.white, fontSize: 20, fontWeight: "800", marginVertical: 8 },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  bottom: { backgroundColor: COLORS.white, padding: 22, borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  label: { fontSize: 12, color: COLORS.muted, fontWeight: "600" },
  address: { backgroundColor: COLORS.input, padding: 18, borderRadius: 12, marginBottom: 22 },
  total: { fontSize: 27, fontWeight: "800", color: COLORS.dark },
  empty: { alignItems: "center", marginTop: 70 },
  emptyTitle: { fontSize: 23, fontWeight: "700", color: COLORS.white, marginVertical: 25 },
});
