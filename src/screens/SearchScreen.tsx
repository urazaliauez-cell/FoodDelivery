import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList, RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { foods, categories } from "../data/foods";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import FoodCard from "../components/FoodCard";
import CategoryCard from "../components/CategoryCard";
import EmptyState from "../components/EmptyState";
import { COLORS } from "../theme/colors";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Search">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function SearchScreen({ navigation, route }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [restaurant, setRestaurant] = useState("");
  const [sort, setSort] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setCategory(route.params?.category || "All");
    setRestaurant(route.params?.restaurant || "");
    setQuery("");
  }, [route.params]);

  const results = foods.filter(food => {
    const search = `${food.name} ${food.category} ${food.restaurant}`.toLowerCase();
    return search.includes(query.toLowerCase()) &&
      (category === "All" || food.category === category) &&
      (!restaurant || food.restaurant === restaurant);
  }).sort((a, b) => sort ? a.price - b.price : b.rating - a.rating);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Search</Text>

      <View style={styles.search}>
        <Ionicons name="search-outline" size={24} color={COLORS.muted} />
        <TextInput style={styles.input} placeholder="Search your favorite food" placeholderTextColor={COLORS.muted} value={query} onChangeText={setQuery} />
        <TouchableOpacity onPress={() => setQuery("")}>
          <Ionicons name="close-circle-outline" size={22} color={COLORS.muted} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginVertical: 18 }}>
        {categories.map(item => (
          <CategoryCard key={item.id} name={item.name} icon={item.icon} selected={category === item.name} onPress={() => setCategory(item.name)} />
        ))}
      </ScrollView>

      {!!restaurant && (
        <TouchableOpacity style={styles.filter} onPress={() => setRestaurant("")}>
          <Text>{restaurant}</Text>
          <Ionicons name="close" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      )}

      <View style={styles.row}>
        <Text style={styles.results}>{results.length} results</Text>
        <TouchableOpacity style={styles.filter} onPress={() => setSort(!sort)}>
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
          <Text>{sort ? "Lowest price" : "Top rated"}</Text>
        </TouchableOpacity>
      </View>

      {results.length === 0 ? (
        <EmptyState icon="search-outline" title="No food found" description="Try another keyword or category." buttonTitle="Clear Filters" onPress={() => { setQuery(""); setCategory("All"); setRestaurant(""); }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {results.map(food => (
              <FoodCard key={food.id} food={food} onPress={() => navigation.navigate("FoodDetails", { foodId: food.id })} onAdd={() => addToCart(food)} favorite={isFavorite(food.id)} onFavorite={() => toggleFavorite(food)} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: 20 },
  title: { fontSize: 26, fontWeight: "800", color: COLORS.dark, marginBottom: 20 },
  search: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: COLORS.input, borderRadius: 12, paddingHorizontal: 15, height: 58 },
  input: { flex: 1, fontSize: 14, color: COLORS.text },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  results: { fontSize: 18, fontWeight: "700" },
  filter: { flexDirection: "row", alignItems: "center", gap: 6, padding: 9, backgroundColor: COLORS.input, borderRadius: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
});
