import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Restaurant } from "../data/restaurants";
import { COLORS } from "../theme/colors";

interface Props {
  restaurant: Restaurant;
  onPress: () => void;
}

export default function RestaurantCard({ restaurant, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.categories}>{restaurant.categories}</Text>

      <View style={styles.row}>
        <Ionicons name="star-outline" size={21} color={COLORS.primary} />
        <Text style={styles.info}>{restaurant.rating}</Text>

        <Ionicons name="bicycle-outline" size={22} color={COLORS.primary} />
        <Text style={styles.info}>{restaurant.delivery}</Text>

        <Ionicons name="time-outline" size={21} color={COLORS.primary} />
        <Text style={styles.info}>{restaurant.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 25,
  },
  image: {
    width: "100%",
    height: 165,
    borderRadius: 15,
    backgroundColor: COLORS.input,
  },
  name: {
    fontSize: 19,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 12,
  },
  categories: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  info: {
    fontSize: 13,
    color: COLORS.text,
    marginRight: 12,
  },
});
