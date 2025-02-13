import { RegisterRequest } from "@/types/auth";
import { useRouter } from "expo-router";
import React, { useReducer, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthService } from "../../../services/api";
import StepActivityData from "./stepActivityData";
import StepPersonalData from "./stepPersonalData";
import StepPhysicalData from "./stepPhysicalData";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  age: "",
  height: "",
  weight: "",
  activityLevel: -1,
};

function formReducer(
  state: typeof initialState,
  action: { field: string; value: string | number }
) {
  console.log(action);
  return { ...state, [action.field]: action.value };
}

export default function RegisterScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!validateEmail(formData.email)) {
      return Alert.alert("Erro", "Email inválido.");
    }
    if (formData.password !== formData.confirmPassword) {
      return Alert.alert("Erro", "Senhas não coincidem.");
    }

    const userCredentials: RegisterRequest = {
      ...formData,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      gender: parseInt(formData.gender),
    };

    console.log(userCredentials);

    try {
      setIsLoading(true);
      await AuthService.register(userCredentials);
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Erro", "Falha no registro.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Cadastro</Text>

        {isLoading && (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!isLoading && (
          <>
            {step === 1 && <StepPersonalData formData={formData} dispatch={dispatch} />}

            {step === 2 && <StepPhysicalData formData={formData} dispatch={dispatch} />}

            {step === 3 && <StepActivityData formData={formData} dispatch={dispatch} />}

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              {step > 1 && (
                <View style={{ flex: 1, marginRight: 5 }}>
                  <TouchableOpacity style={styles.button} onPress={prevStep}>
                    <Text style={styles.buttonText}>Voltar</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{ flex: 1, marginLeft: step > 1 ? 5 : 0 }}>
                {step < 3 ? (
                  <TouchableOpacity style={styles.button} onPress={nextStep}>
                    <Text style={styles.buttonText}>Próximo</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Finalizar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={{ marginTop: 20, alignItems: "center" }}>
              <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <Text style={{ color: "blue" }}>Já tem conta? Faça login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  buttonOpacity: {
    opacity: 0.8, 
  },
});
