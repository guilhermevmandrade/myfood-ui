import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ActivityLevel } from "@/types/enums/activityLevel";

interface StepActivityDataProps {
  formData: {
    activityLevel: number;
  };
  dispatch: React.Dispatch<{ field: string; value: number }>;
}

export default function StepActivityData({ formData, dispatch }: StepActivityDataProps) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Nível de Atividade:
      </Text>

      {[
        { level: ActivityLevel.SEDENTARY, label: "Sedentário", description: "Pouco ou nenhum exercício" },
        { level: ActivityLevel.LIGHT, label: "Pouco ativo", description: "Exercício leve (1 a 3 dias por semana)" },
        { level: ActivityLevel.MODERATE, label: "Moderadamente ativo", description: "Exercício moderado (3 a 5 dias por semana)" },
        { level: ActivityLevel.ACTIVE, label: "Muito ativo", description: "Exercício intenso (6 a 7 dias por semana)" },
        { level: ActivityLevel.ATHLETE, label: "Extremamente ativo", description: "Atleta ou trabalho físico pesado" },
      ].map(({ level, label, description }) => (
        <TouchableOpacity
          key={level}
          style={{
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: formData.activityLevel === level ? "#E6E6E6" : "transparent",
            borderRadius: 8,
          }}
          onPress={() => dispatch({ field: "activityLevel", value: level })}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: formData.activityLevel === level ? "#007bff" : "#ccc",
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {formData.activityLevel === level && (
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
          
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontWeight: "600", marginBottom: 4 }}>{label}</Text>
            <Text style={{ color: "#A9A9A9" }}>{description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
