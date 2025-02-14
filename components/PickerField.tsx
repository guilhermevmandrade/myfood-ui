import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface PickerFieldProps {
  label: string;
  selectedValue: number;
  options: { label: string; value: number }[];
  errorMessage?: string | null;
  onValueChange: (value: number) => void;
}

export const PickerField: React.FC<PickerFieldProps> = ({
  label,
  selectedValue,
  options,
  errorMessage,
  onValueChange,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[
          styles.picker,
          !!errorMessage && { borderColor: "red", borderWidth: 1, marginBottom: 5 },
        ]}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
      {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
    color: "#333",
    fontWeight: "600",
  },
  picker: {
    height: 40,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    color: "#333",
    fontSize: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
});
