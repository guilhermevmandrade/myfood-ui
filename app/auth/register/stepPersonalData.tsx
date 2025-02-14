import { InputField } from "@/components/InputField";
import React from "react";
import { Text, View } from "react-native";

interface StepPersonalDataProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    nameError: string | null;
    emailError: string | null;
    passwordError: string | null;
    confirmPasswordError: string | null;
  };
  dispatch: React.Dispatch<{ field: string; value: string }>;
}

export default function StepPersonalData({ formData, errors, dispatch }: StepPersonalDataProps) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>Dados Pessoais:</Text>

      <InputField
        label="Nome"
        value={formData.name}
        onChangeText={(text) => dispatch({ field: "name", value: text })}
        placeholder="Digite seu nome"
        errorMessage={errors.nameError}
      />

      <InputField
        label="Email"
        value={formData.email}
        onChangeText={(text) => dispatch({ field: "email", value: text })}
        placeholder="Digite seu email"
        keyboardType="email-address"
        errorMessage={errors.emailError}
      />

      <InputField
        label="Senha"
        value={formData.password}
        onChangeText={(text) => dispatch({ field: "password", value: text })}
        placeholder="Digite sua senha"
        secureTextEntry
        errorMessage={errors.passwordError}
      />

      <InputField
        label="Confirmação de Senha"
        value={formData.confirmPassword}
        onChangeText={(text) => dispatch({ field: "confirmPassword", value: text })}
        placeholder="Confirme sua senha"
        secureTextEntry
        errorMessage={errors.confirmPasswordError}
      />
    </View>
  );
}
