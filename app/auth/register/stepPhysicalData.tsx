import { InputField } from "@/components/InputField";
import { PickerField } from "@/components/PickerField";
import { Gender } from "@/types/enums/gender";
import React from "react";
import { View, Text } from "react-native";

interface StepPhysicalDataProps {
  formData: {
    gender: string;
    age: string;
    height: string;
    weight: string;
  };
  dispatch: React.Dispatch<{ field: string; value: string }>;
}

export default function StepPhysicalData({ formData, dispatch }: StepPhysicalDataProps) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Dados Físicos:
      </Text>

      <PickerField
        label="Gênero"
        selectedValue={parseInt(formData.gender)}
        onValueChange={(text) => dispatch({ field: "gender", value: String(text) })}
        options={[
          { label: "Selecione...", value: -1 },
          { label: "Masculino", value: Gender.MALE },
          { label: "Feminino", value: Gender.FEMALE },
        ]}
      />

      <InputField
        label="Idade"
        value={formData.age}
        onChangeText={(text: any) => dispatch({ field: "age", value: text })}
        placeholder="Digite sua idade"
        keyboardType="numeric"
      />
      <InputField
        label="Altura (em cm)"
        value={formData.height}
        onChangeText={(text: any) => dispatch({ field: "height", value: text })}
        placeholder="Digite sua altura"
        keyboardType="numeric"
      />
      <InputField
        label="Peso (em kg)"
        value={formData.weight}
        onChangeText={(text: any) => dispatch({ field: "weight", value: text })}
        placeholder="Digite seu peso"
        keyboardType="numeric"
      />
    </View>
  );
}
