import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Food } from "../data/foods";
import { COLORS } from "../theme/colors";

interface Props {
  food: Food;
  onPress: () => void;
  onAdd: () => void;
  favorite?: boolean;
  onFavorite?: () => void;
}

export default function FoodCard({
  food,
  onPress,
  onAdd,
  favorite,
  onFavorite,
}: Props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: food.image }} style={styles.image} />
      </TouchableOpacity>

      {onFavorite && (
        <TouchableOpacity style={styles.heart} onPress={onFavorite}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={21}
            color={favorite ? COLORS.error : COLORS.text}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.name} numberOfLines={1}>{food.name}</Text>
        <Text style={styles.restaurant} numberOfLines={1}>
          {food.restaurant}
        </Text>
      </TouchableOpacity>

      <View style={styles.rating}>
        <Ionicons name="star" size={15} color={COLORS.primary} />
        <Text style={styles.ratingText}>{food.rating}</Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.price}>{food.price} ₸</Text>
        <TouchableOpacity style={styles.add} onPress={onAdd}>
          <Ionicons name="add" size={23} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: "100%",
    height: 135,
    borderRadius: 13,
    backgroundColor: COLORS.input,
  },
  heart: {
    position: "absolute",
    top: 17,
    right: 17,
    backgroundColor: COLORS.white,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 10,
  },
  restaurant: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 7,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  price: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },
  add: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
