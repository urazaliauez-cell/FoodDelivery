import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const slides = [
  {
    title: "All your favorites",
    description: "Get all your loved foods in one place. Just place your order and we do the rest.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  },
  {
    title: "Delicious food",
    description: "Discover amazing meals from your favorite restaurants.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
  },
  {
    title: "Order from chosen chef",
    description: "Fresh ingredients and delicious meals prepared just for you.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
  },
  {
    title: "Free delivery offers",
    description: "Enjoy fast delivery and special offers every day.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800",
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  function next() {
    if (index === slides.length - 1) {
      navigation.replace("Login");
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageBox}>
          <Image source={{ uri: slide.image }} style={styles.image} />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setIndex(i)}
              style={[styles.dot, index === i && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <CustomButton
        title={index === slides.length - 1 ? "Get Started" : "Next"}
        onPress={next}
      />

      <TouchableOpacity
        style={styles.skip}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingBottom: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBox: {
    width: "100%",
    height: 280,
    backgroundColor: "#FFF0DF",
    borderRadius: 35,
    padding: 15,
    marginBottom: 35,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.dark,
    textAlign: "center",
  },
  description: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 25,
    textAlign: "center",
    marginTop: 15,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 30,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#FFD5B8",
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 20,
  },
  skip: {
    alignItems: "center",
    padding: 15,
  },
  skipText: {
    color: COLORS.muted,
    fontSize: 15,
  },
});
