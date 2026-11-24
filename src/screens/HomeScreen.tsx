import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList, RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { foods, categories } from "../data/foods";
import { restaurants } from "../data/restaurants";
import CategoryCard from "../components/CategoryCard";
import FoodCard from "../components/FoodCard";
import RestaurantCard from "../components/RestaurantCard";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { count, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [category, setCategory] = useState("All");
  const [offer, setOffer] = useState(false);

  const filtered = category === "All" ? foods : foods.filter(f => f.category === category);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="menu" size={26} color={COLORS.dark} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("Location")}>
            <Text style={styles.deliver}>DELIVER TO</Text>
            <View style={styles.row}>
              <Text numberOfLines={1} style={styles.address}>{user?.address || "Almaty"}</Text>
              <Ionicons name="chevron-down" size={14} color={COLORS.dark} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bag} onPress={() => navigation.navigate("Cart")}>
            <Ionicons name="bag-outline" size={25} color={COLORS.white} />
            {count > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{count}</Text></View>}
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>Hey {user?.name?.split(" ")[0] || "Guest"}, <Text style={{ fontWeight: "800" }}>Good Afternoon!</Text></Text>

        <TouchableOpacity style={styles.search} onPress={() => navigation.navigate("Search", {})}>
          <Ionicons name="search-outline" size={24} color={COLORS.muted} />
          <Text style={{ color: COLORS.muted }}>Search dishes, restaurants</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOffer(true)}>
          <LinearGradient colors={["#FFB800", "#FF7622"]} style={styles.banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerSmall}>SPECIAL OFFER</Text>
              <Text style={styles.bannerTitle}>25% OFF</Text>
              <Text style={styles.bannerSmall}>Your next delicious meal</Text>
              <Text style={styles.bannerCode}>FOOD25</Text>
            </View>
            <Text style={{ fontSize: 75 }}>🍔</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search", {})}>
            <Text style={styles.seeAll}>See All ›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {categories.map(item => (
            <CategoryCard key={item.id} name={item.name} icon={item.icon} selected={category === item.name} onPress={() => setCategory(item.name)} />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{category === "All" ? "Popular Foods" : category}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search", { category })}>
            <Text style={styles.seeAll}>See All ›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {filtered.slice(0, 4).map(food => (
            <FoodCard
              key={food.id}
              food={food}
              onPress={() => navigation.navigate("FoodDetails", { foodId: food.id })}
              onAdd={() => addToCart(food)}
              favorite={isFavorite(food.id)}
              onFavorite={() => toggleFavorite(food)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Open Restaurants</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search", {})}>
            <Text style={styles.seeAll}>See All ›</Text>
          </TouchableOpacity>
        </View>

        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onPress={() => navigation.navigate("Search", { restaurant: restaurant.name })} />
        ))}
      </ScrollView>

      <Modal visible={offer} transparent animationType="fade" onRequestClose={() => setOffer(false)}>
        <View style={styles.overlay}>
          <LinearGradient colors={["#FFCC00", "#FF7622"]} style={styles.offer}>
            <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => setOffer(false)}>
              <Ionicons name="close-circle" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={{ fontSize: 55 }}>🎉</Text>
            <Text style={styles.offerTitle}>Hurry Offers!</Text>
            <Text style={styles.offerText}>Get 25% off your order</Text>
            <Text style={styles.offerCode}>FOOD25</Text>
            <CustomButton title="Got It" onPress={() => setOffer(false)} style={{ width: "100%", backgroundColor: COLORS.dark }} />
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 20 },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  menu: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.input, alignItems: "center", justifyContent: "center" },
  deliver: { color: COLORS.primary, fontSize: 11, fontWeight: "800" },
  row: { flexDirection: "row", alignItems: "center", gap: 5 },
  address: { color: COLORS.text, fontSize: 13, flexShrink: 1, marginTop: 4 },
  bag: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.dark, alignItems: "center", justifyContent: "center" },
  badge: { position: "absolute", top: -3, right: -3, backgroundColor: COLORS.primary, borderRadius: 12, minWidth: 22, height: 22, alignItems: "center", justifyContent: "center" },
  badgeText: { color: COLORS.white, fontSize: 11, fontWeight: "700" },
  greeting: { fontSize: 17, marginVertical: 25, color: COLORS.dark },
  search: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: COLORS.input, padding: 18, borderRadius: 13 },
  banner: { flexDirection: "row", alignItems: "center", padding: 20, borderRadius: 18, marginVertical: 22 },
  bannerSmall: { color: COLORS.white, fontSize: 12, fontWeight: "600" },
  bannerTitle: { fontSize: 34, color: COLORS.white, fontWeight: "900", marginVertical: 5 },
  bannerCode: { color: COLORS.dark, backgroundColor: COLORS.white, alignSelf: "flex-start", padding: 7, borderRadius: 6, marginTop: 12, fontWeight: "800" },
  section: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16, marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: COLORS.dark },
  seeAll: { fontSize: 13, color: COLORS.text },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", alignItems: "center", justifyContent: "center" },
  offer: { width: "85%", maxWidth: 360, padding: 25, borderRadius: 25, alignItems: "center" },
  offerTitle: { color: COLORS.white, fontSize: 32, fontWeight: "900" },
  offerText: { color: COLORS.white, marginVertical: 15 },
  offerCode: { fontSize: 25, color: COLORS.white, fontWeight: "800", marginBottom: 20 },
});
