import { WeightGoal } from "@/types/enums/weightGoal";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface StepWeightGoalProps {
  formData: {
    dailyCalories: string;
    weightGoal: string;
  };
  errors: {
    dailyCaloriesError: string | null;
    weightGoalError: string | null;
  };
  dispatch: React.Dispatch<{ field: string; value: string }>;
}

export default function StepWeightGoal({ formData, errors, dispatch }: StepWeightGoalProps) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Nível de Atividade:
      </Text>
      {[
        {
          level: WeightGoal.LOSE,
          label: "Perda de peso",
          description: "Déficit calórico para reduzir gordura corporal.",
        },
        {
          level: WeightGoal.MAINTAIN,
          label: "Manutenção",
          description: "Equilíbrio calórico para manter o peso atual.",
        },
        {
          level: WeightGoal.GAIN,
          label: "Ganho de peso",
          description: "Superávit calórico para ganho muscular ou aumento de peso.",
        },
      ].map(({ level, label, description }) => (
        <TouchableOpacity
          key={level}
          style={{
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: formData.weightGoal === String(level) ? "#E6E6E6" : "transparent",
            borderRadius: 8,
          }}
          onPress={() => {
            dispatch({ field: "weightGoal", value: String(level) });
            errors.weightGoalError = null;
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: formData.weightGoal === String(level) ? "#007bff" : "#ccc",
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {formData.weightGoal === String(level) && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "#007bff",
                }}
              />
            )}
          </View>

          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={{ fontWeight: "600", marginBottom: 4 }}>{label}</Text>
            <Text style={{ color: "#A9A9A9", flexShrink: 1 }}>{description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {errors.weightGoalError && (
        <Text style={{ color: "red", marginTop: 10, marginLeft: 10 }}>
          {errors.weightGoalError}
        </Text>
      )}
    </View>
  );
}
