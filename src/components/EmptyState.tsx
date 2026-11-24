import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import CustomButton from "./CustomButton";

interface Props {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  buttonTitle?: string;
  onPress?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  buttonTitle,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={65} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {buttonTitle && onPress && (
        <CustomButton
          title={buttonTitle}
          onPress={onPress}
          style={{ width: 230, marginTop: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFF1E6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },
  description: {
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 23,
    marginTop: 10,
  },
});
