import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface PickerFieldProps {
  label: string;
  selectedValue: number;
  onValueChange: (value: number) => void;
  options: { label: string; value: number }[];
}

export const PickerField: React.FC<PickerFieldProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      {/* Picker com estilo similar ao Input */}
      <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
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
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    color: "#333",
    fontSize: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
