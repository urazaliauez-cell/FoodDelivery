import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

interface Props {
  title: string;
  onBack?: () => void;
  rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
  onRightPress?: () => void;
}

export default function ScreenHeader({
  title,
  onBack,
  rightIcon,
  onRightPress,
}: Props) {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.circle} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightIcon && (
        <TouchableOpacity style={styles.circle} onPress={onRightPress}>
          <Ionicons name={rightIcon} size={22} color={COLORS.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.input,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
  },
});
