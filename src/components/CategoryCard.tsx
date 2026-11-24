import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

interface Props {
  name: string;
  icon: string;
  selected?: boolean;
  onPress: () => void;
}

export default function CategoryCard({
  name,
  icon,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.card, selected && styles.selected]}
    >
      <View style={styles.circle}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 8,
    paddingRight: 18,
    borderRadius: 35,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  selected: {
    backgroundColor: "#FFD27D",
    borderColor: "#FFD27D",
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 25,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
});
