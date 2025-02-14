import React from "react";
import { Text, TextInput, View } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address";
  secureTextEntry?: boolean;
  errorMessage?: string | null;
  onChangeText: (text: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  errorMessage,
  onChangeText,
}) => (
  <View>
    <Text style={{ marginBottom: 10, color: "#333", fontWeight: "600" }}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={"#A9A9A9"}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, !!errorMessage && { borderColor: "red", borderWidth: 1, marginBottom: 5 }]}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
    {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
  </View>
);

const styles = {
  input: {
    padding: 12,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#E6E6E6",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
};
