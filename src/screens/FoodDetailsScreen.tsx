import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { foods } from "../data/foods";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import QuantitySelector from "../components/QuantitySelector";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "FoodDetails">;

export default function FoodDetailsScreen({ navigation, route }: Props) {
  const food = foods.find(item => item.id === route.params.foodId);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  if (!food) {
    return <SafeAreaView style={{ flex: 1, padding: 25 }}><Text>Food not found</Text><CustomButton title="Go Back" onPress={() => navigation.goBack()} /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: food.image }} style={styles.image} />
          <TouchableOpacity style={[styles.circle, { left: 15 }]} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={23} color={COLORS.dark} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circle, { right: 15 }]} onPress={() => toggleFavorite(food)}>
            <Ionicons name={isFavorite(food.id) ? "heart" : "heart-outline"} size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.restaurant}>
            <Ionicons name="restaurant-outline" size={19} color={COLORS.primary} />
            <Text>{food.restaurant}</Text>
          </View>

          <Text style={styles.title}>{food.name}</Text>
          <Text style={styles.description}>{food.description}</Text>

          <View style={styles.info}>
            <Ionicons name="star-outline" size={23} color={COLORS.primary} />
            <Text>{food.rating}</Text>
            <Ionicons name="bicycle-outline" size={25} color={COLORS.primary} />
            <Text>Delivery</Text>
            <Ionicons name="time-outline" size={23} color={COLORS.primary} />
            <Text>{food.time}</Text>
          </View>

          <Text style={styles.label}>SIZE</Text>
          <View style={styles.sizes}>
            {["S", "M", "L"].map(item => (
              <TouchableOpacity key={item} style={[styles.size, size === item && styles.active]} onPress={() => setSize(item)}>
                <Text style={{ color: size === item ? COLORS.white : COLORS.text, fontWeight: "700" }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>INGREDIENTS</Text>
          <View style={styles.ingredients}>
            {["🥬", "🍅", "🧀", "🧅", "🌶️"].map(item => (
              <View key={item} style={styles.ingredient}><Text style={{ fontSize: 26 }}>{item}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{food.price * quantity} ₸</Text>
          <QuantitySelector quantity={quantity} onIncrease={() => { setQuantity(q => q + 1); setAdded(false); }} onDecrease={() => { setQuantity(q => Math.max(1, q - 1)); setAdded(false); }} />
        </View>

        <CustomButton title={added ? "View Cart" : "Add to Cart"} onPress={() => {
          if (added) navigation.navigate("Main", { screen: "Cart" });
          else {
            addToCart(food, quantity);
            setAdded(true);
          }
        }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  hero: { height: 280, backgroundColor: COLORS.secondary, margin: 15, borderRadius: 22, overflow: "hidden" },
  image: { width: "100%", height: "100%" },
  circle: { position: "absolute", top: 15, width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" },
  content: { padding: 20 },
  restaurant: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start", padding: 10, borderRadius: 25, borderWidth: 1, borderColor: COLORS.border },
  title: { fontSize: 27, fontWeight: "800", color: COLORS.dark, marginTop: 20 },
  description: { fontSize: 14, lineHeight: 24, color: COLORS.muted, marginTop: 12 },
  info: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 22, flexWrap: "wrap" },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 14 },
  sizes: { flexDirection: "row", gap: 14, marginBottom: 25 },
  size: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.input, alignItems: "center", justifyContent: "center" },
  active: { backgroundColor: COLORS.primary },
  ingredients: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  ingredient: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#FFF0DF", alignItems: "center", justifyContent: "center" },
  bottom: { padding: 22, backgroundColor: COLORS.input, borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  price: { fontSize: 29, fontWeight: "800", color: COLORS.dark },
});
