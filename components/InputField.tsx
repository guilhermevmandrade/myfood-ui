import React from "react";
import { Text, TextInput, View } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address";
  secureTextEntry?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
}) => (
  <View>
    <Text style={{ marginBottom: 10, color: "#333", fontWeight: "600" }}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={"#A9A9A9"}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
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
};
