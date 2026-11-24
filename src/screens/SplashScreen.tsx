import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      if (user) {
        navigation.replace(user.address ? "Main" : "Location");
      } else {
        navigation.replace("Onboarding");
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [loading, user, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Ionicons name="restaurant" size={65} color={COLORS.primary} />
        <Text style={styles.brand}>
          F<Text style={{ color: COLORS.primary }}>oo</Text>d
        </Text>
        <Text style={styles.subtitle}>FOOD DELIVERY</Text>
      </View>

      <ActivityIndicator
        style={styles.loader}
        size="small"
        color={COLORS.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    alignItems: "center",
  },
  brand: {
    fontSize: 65,
    fontWeight: "900",
    color: COLORS.dark,
    letterSpacing: -4,
  },
  subtitle: {
    color: COLORS.muted,
    letterSpacing: 5,
    fontSize: 12,
    fontWeight: "600",
  },
  loader: {
    position: "absolute",
    bottom: 65,
  },
});
