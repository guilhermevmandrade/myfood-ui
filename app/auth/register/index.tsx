import { RegisterRequest } from "@/types/auth";
import {
  validateActivityLevel,
  validateAge,
  validateConfirmPassword,
  validateEmail,
  validateGender,
  validateHeight,
  validateName,
  validatePassword,
  validateWeight,
} from "@/utils/userValidator";
import { useRouter } from "expo-router";
import React, { useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
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
  return { ...state, [action.field]: action.value };
}

export default function RegisterScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({
    nameError: null as string | null,
    emailError: null as string | null,
    passwordError: null as string | null,
    confirmPasswordError: null as string | null,
    genderError: null as string | null,
    ageError: null as string | null,
    heightError: null as string | null,
    weightError: null as string | null,
    activityLevelError: null as string | null,
  });

  useEffect(() => {
    if (isValidated) {
      validateStep();
    }
  }, [isValidated, formData, step]);

  const handlePersonalDataValidation = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      nameError,
      emailError,
      passwordError,
      confirmPasswordError,
    }));

    return !nameError && !emailError && !passwordError && !confirmPasswordError;
  };

  const handlePhysicalDataValidation = () => {
    const genderError = validateGender(formData.gender);
    const ageError = validateAge(formData.age);
    const heightError = validateHeight(formData.height);
    const weightError = validateWeight(formData.weight);

    setErrors((prevErrors) => ({
      ...prevErrors,
      genderError,
      ageError,
      heightError,
      weightError,
    }));

    return !genderError && !ageError && !heightError && !weightError;
  };

  const handleActivityDataValidation = () => {
    const activityLevelError = validateActivityLevel(formData.activityLevel);

    setErrors((prevErrors) => ({
      ...prevErrors,
      activityLevelError,
    }));

    return !activityLevelError;
  };

  const handleRegister = async () => {
    const isPersonalDataValid = handlePersonalDataValidation();
    const isPhysicalDataValid = handlePhysicalDataValidation();
    const isActivityDataValid = handleActivityDataValidation();

    if (!isPersonalDataValid || !isPhysicalDataValid || !isActivityDataValid) {
      return;
    }

    const userCredentials: RegisterRequest = {
      ...formData,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      gender: parseInt(formData.gender),
    };

    try {
      setIsLoading(true);
      await AuthService.register(userCredentials);
      router.push("/(tabs)");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      return handlePersonalDataValidation();
    } else if (step === 2) {
      return handlePhysicalDataValidation();
    } else if (step === 3) {
      return handleActivityDataValidation();
    }
  };

  const nextStep = () => {
    const isValid = validateStep();
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
      setIsValidated(false);
    } else {
      setIsValidated(true);
    }
  };

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
            {step === 1 && (
              <StepPersonalData formData={formData} dispatch={dispatch} errors={errors} />
            )}
            {step === 2 && (
              <StepPhysicalData formData={formData} dispatch={dispatch} errors={errors} />
            )}
            {step === 3 && (
              <StepActivityData formData={formData} dispatch={dispatch} errors={errors} />
            )}

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
});
