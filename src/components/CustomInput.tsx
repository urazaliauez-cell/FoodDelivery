import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

interface Props extends TextInputProps {
  label?: string;
  password?: boolean;
  error?: string;
}

export default function CustomInput({
  label,
  password = false,
  error,
  ...props
}: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label.toUpperCase()}</Text>}
      <View style={[styles.inputBox, error ? styles.errorBorder : null]}>
        <TextInput
          {...props}
          style={[styles.input, props.style]}
          placeholderTextColor={COLORS.muted}
          secureTextEntry={password ? hidden : props.secureTextEntry}
        />
        {password && (
          <TouchableOpacity onPress={() => setHidden(!hidden)}>
            <Ionicons
              name={hidden ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={COLORS.muted}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 9,
    letterSpacing: 0.5,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.input,
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 58,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 15,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  error: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
  },
});
