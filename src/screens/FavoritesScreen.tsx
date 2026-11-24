import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList, RootStackParamList } from "../navigation/types";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import FoodCard from "../components/FoodCard";
import EmptyState from "../components/EmptyState";
import { COLORS } from "../theme/colors";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "Favorites">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function FavoritesScreen({ navigation }: Props) {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>My Favorites</Text>
      <Text style={styles.subtitle}>{favorites.length} saved items</Text>

      {favorites.length === 0 ? (
        <EmptyState icon="heart-outline" title="No favorites yet" description="Save your favorite meals by tapping the heart icon." buttonTitle="Explore Food" onPress={() => navigation.navigate("Home")} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {favorites.map(food => (
              <FoodCard key={food.id} food={food} favorite onFavorite={() => toggleFavorite(food)} onAdd={() => addToCart(food)} onPress={() => navigation.navigate("FoodDetails", { foodId: food.id })} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: 20 },
  title: { fontSize: 27, fontWeight: "800", color: COLORS.dark },
  subtitle: { color: COLORS.muted, marginTop: 8, marginBottom: 25 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
});
