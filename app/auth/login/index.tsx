import { InputField } from "@/components/InputField";
import { AuthService } from "@/services/api";
import { LoginRequest } from "@/types/auth";
import { validateEmail, validatePasswordLogin } from "@/utils/userValidator";
import { useRouter } from "expo-router";
import React, { useReducer, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const initialFormState = {
  email: "",
  password: "",
};

const initialErrorState = {
  emailError: null,
  passwordError: null,
};

function formReducer(state: typeof initialFormState, action: { field: string; value: string }) {
  return { ...state, [action.field]: action.value };
}

function errorReducer(
  state: typeof initialErrorState,
  action: { field: string; error: string | null }
) {
  return { ...state, [action.field]: action.error };
}

export default function LoginScreen() {
  const router = useRouter();

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [errorState, errorDispatch] = useReducer(errorReducer, initialErrorState);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const emailValidationError = validateEmail(formState.email);
    const passwordValidationError = validatePasswordLogin(formState.password);

    errorDispatch({ field: "emailError", error: emailValidationError });
    errorDispatch({ field: "passwordError", error: passwordValidationError });

    if (emailValidationError || passwordValidationError) {
      return;
    }

    try {
      setIsLoading(true);
      const credentials: LoginRequest = { email: formState.email, password: formState.password };
      await AuthService.login(credentials);
      router.push("/(tabs)");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha no login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Login</Text>

      {isLoading && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {!isLoading && (
        <>
          <InputField
            label="E-mail"
            placeholder="Digite seu email"
            value={formState.email}
            onChangeText={(text) => formDispatch({ field: "email", value: text })}
            keyboardType="email-address"
            errorMessage={errorState.emailError}
          />

          <InputField
            label="Senha"
            placeholder="Digite sua senha"
            value={formState.password}
            onChangeText={(text) => formDispatch({ field: "password", value: text })}
            secureTextEntry
            errorMessage={errorState.passwordError}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text style={{ color: "blue" }}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
