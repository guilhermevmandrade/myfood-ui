import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DonutPieChart from "@/components/donutPieChart";

interface StepMacrosAndCaloriesProps {
  formData: {
    proteinsPercentage: string;
    carbsPercentage: string;
    fatsPercentage: string;
    dailyCalories: string;
  };
  errors: {
    proteinsPercentageError: string | null;
    carbsPercentageError: string | null;
    fatsPercentageError: string | null;
  };
}

export default function StepMacrosAndCalories({ formData, errors }: StepMacrosAndCaloriesProps) {
  const proteinsPercentageNumber = parseFloat(formData.proteinsPercentage);
  const carbsPercentageNumber = parseFloat(formData.carbsPercentage);
  const fatsPercentageNumber = parseFloat(formData.fatsPercentage);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Composição nutricional:</Text>

      <Text style={styles.text}>
        Carboidratos: {formData.carbsPercentage}%
      </Text>
      <Text style={styles.text}>
        Proteínas: {formData.proteinsPercentage}%
      </Text>
      <Text style={styles.text}>
        Gorduras: {formData.fatsPercentage}%
      </Text>

      <DonutPieChart
        proteinsPercentage={proteinsPercentageNumber}
        carbsPercentage={carbsPercentageNumber} 
        fatsPercentage={fatsPercentageNumber} 
      />

      <Text style={styles.title}>
        Calorias Diárias: {formData.dailyCalories} kcal
      </Text>

      <Text style={styles.infoText}>
        Estes valores foram calculados com base no seu objetivo e podem ser alterados futuramente.
      </Text>

      {errors.proteinsPercentageError && (
        <Text style={styles.errorText}>{errors.proteinsPercentageError}</Text>
      )}
      {errors.carbsPercentageError && (
        <Text style={styles.errorText}>{errors.carbsPercentageError}</Text>
      )}
      {errors.fatsPercentageError && (
        <Text style={styles.errorText}>{errors.fatsPercentageError}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
});