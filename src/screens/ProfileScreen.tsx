import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList, RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList>
>;

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface Order {
  id: string;
  total: number;
  date: string;
  status: string;
}

export default function ProfileScreen({ navigation }: Props) {
  const { user, updateProfile, logout } = useAuth();
  const { clearCart } = useCart();
  const { clearFavorites } = useFavorites();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [modal, setModal] = useState<"edit" | "orders" | "logout" | "help" | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useFocusEffect(useCallback(() => {
    if (user) {
      AsyncStorage.getItem(`food_orders_${user.email}`)
        .then(data => setOrders(data ? JSON.parse(data) : []))
        .catch(console.error);
    }
  }, [user]));

  async function save() {
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      await updateProfile({ name, phone, address });
      setModal(null);
    } catch {
      setError("Unable to save profile.");
    }
  }

  async function signOut() {
    try {
      await logout();
      clearCart();
      clearFavorites();
      setModal(null);
      navigation.getParent()?.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch {
      setError("Unable to log out.");
    }
  }

  const menu: { title: string; icon: IconName; color: string; action: () => void }[] = [
    { title: "Personal Info", icon: "person-outline", color: "#FF7622", action: () => { setName(user?.name || ""); setPhone(user?.phone || ""); setAddress(user?.address || ""); setError(""); setModal("edit"); } },
    { title: "Addresses", icon: "location-outline", color: "#FF7622", action: () => navigation.navigate("Location") },
    { title: "Favorites", icon: "heart-outline", color: "#FF4081", action: () => navigation.navigate("Favorites") },
    { title: "My Orders", icon: "bag-handle-outline", color: "#3699FF", action: () => setModal("orders") },
    { title: "Cart", icon: "cart-outline", color: "#3699FF", action: () => navigation.navigate("Cart") },
    { title: "Help Center", icon: "help-circle-outline", color: "#9254DE", action: () => setModal("help") },
    { title: "Log Out", icon: "log-out-outline", color: "#FF4444", action: () => { setError(""); setModal("logout"); } },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.user}>
          <View style={styles.avatar}>
            <Text style={styles.initial}>{user?.name?.charAt(0).toUpperCase() || "U"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user?.name || "Guest"}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
          <TouchableOpacity onPress={menu[0].action}>
            <Ionicons name="create-outline" size={25} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.number}>{orders.length}</Text>
            <Text style={styles.email}>Orders</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.number}>Food</Text>
            <Text style={styles.email}>Member</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menu.map(item => (
            <TouchableOpacity key={item.title} style={styles.item} onPress={item.action}>
              <View style={styles.icon}>
                <Ionicons name={item.icon} size={23} color={item.color} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>Food Delivery v1.0.0</Text>
      </ScrollView>

      <Modal visible={modal !== null} transparent animationType="slide" onRequestClose={() => setModal(null)}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => setModal(null)}>
              <Ionicons name="close-circle-outline" size={28} color={COLORS.dark} />
            </TouchableOpacity>

            <ScrollView keyboardShouldPersistTaps="handled">
              {modal === "edit" && (
                <>
                  <Text style={styles.modalTitle}>Edit Profile</Text>
                  <CustomInput label="Full Name" value={name} onChangeText={setName} />
                  <CustomInput label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                  <CustomInput label="Address" value={address} onChangeText={setAddress} />
                  {!!error && <Text style={{ color: COLORS.error }}>{error}</Text>}
                  <CustomButton title="Save Changes" onPress={save} />
                </>
              )}

              {modal === "orders" && (
                <>
                  <Text style={styles.modalTitle}>My Orders</Text>
                  {orders.length === 0 && <Text style={styles.email}>You have no orders yet.</Text>}
                  {orders.map(order => (
                    <View key={order.id} style={styles.order}>
                      <Text style={{ fontWeight: "700" }}>Order #{order.id}</Text>
                      <Text style={styles.email}>{order.date}</Text>
                      <Text style={{ color: COLORS.success, marginVertical: 5 }}>{order.status}</Text>
                      <Text style={styles.number}>{order.total} ₸</Text>
                    </View>
                  ))}
                </>
              )}

              {modal === "logout" && (
                <>
                  <Text style={styles.modalTitle}>Log Out</Text>
                  <Text style={styles.email}>Are you sure you want to log out?</Text>
                  {!!error && <Text style={{ color: COLORS.error }}>{error}</Text>}
                  <CustomButton title="Yes, Log Out" onPress={signOut} />
                  <CustomButton title="Cancel" outline onPress={() => setModal(null)} />
                </>
              )}

              {modal === "help" && (
                <>
                  <Text style={styles.modalTitle}>Help Center</Text>
                  <Text style={styles.help}>How to order? Choose a meal, add it to your cart and confirm your delivery address.</Text>
                  <Text style={styles.help}>How to use a promo code? Enter FOOD25 at checkout to receive a 25% demo discount.</Text>
                  <Text style={styles.help}>This application is an educational Food Delivery project.</Text>
                  <CustomButton title="Close" onPress={() => setModal(null)} />
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: 20 },
  title: { fontSize: 27, fontWeight: "800", color: COLORS.dark, marginBottom: 25 },
  user: { flexDirection: "row", alignItems: "center", gap: 15, marginBottom: 25 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#FFD9B8", alignItems: "center", justifyContent: "center" },
  initial: { fontSize: 38, fontWeight: "800", color: COLORS.primary },
  name: { fontSize: 22, fontWeight: "800", color: COLORS.dark },
  email: { color: COLORS.muted, fontSize: 13, marginTop: 5, lineHeight: 21 },
  stats: { flexDirection: "row", backgroundColor: COLORS.input, borderRadius: 18, padding: 20, marginBottom: 25 },
  stat: { flex: 1, alignItems: "center" },
  number: { fontSize: 21, fontWeight: "800", color: COLORS.dark },
  menu: { backgroundColor: COLORS.input, borderRadius: 18, padding: 12 },
  item: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, marginBottom: 3 },
  icon: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" },
  menuText: { flex: 1, fontSize: 15, fontWeight: "600", color: COLORS.text },
  version: { textAlign: "center", color: COLORS.muted, marginVertical: 25 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end", alignItems: "center" },
  sheet: { width: "100%", maxWidth: 480, maxHeight: "85%", backgroundColor: COLORS.white, borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25 },
  modalTitle: { fontSize: 24, fontWeight: "800", marginBottom: 20, color: COLORS.dark },
  order: { backgroundColor: COLORS.input, borderRadius: 12, padding: 15, marginBottom: 12 },
  help: { color: COLORS.text, lineHeight: 24, marginBottom: 20 },
});

