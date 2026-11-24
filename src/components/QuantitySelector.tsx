import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onDecrease}>
        <Ionicons name="remove" size={20} color={COLORS.white} />
      </TouchableOpacity>
      <Text style={styles.number}>{quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Ionicons name="add" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.dark,
    borderRadius: 30,
    padding: 8,
    gap: 15,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#414150",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
});
