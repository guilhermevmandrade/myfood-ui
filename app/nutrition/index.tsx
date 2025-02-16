import PopupMessage from "@/components/popupMessage";
import useApiRequest from "@/hooks/useApiRequest";
import { NutritionalGoalService } from "@/services/api";
import { DailyCaloriesResponse, NutritionalGoalRequest } from "@/types/goal";
import {
  validateDailyCalories,
  validateMacronutrientPercentage,
  validateMacronutrientSum,
  validateWeightGoal,
} from "@/utils/nutritionValidator";
import { useRouter } from "expo-router";
import React, { useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StepMacrosAndCalories from "./stepMacrosAndCalories";
import StepWeightGoal from "./stepWeightGoal";

const initialState = {
  dailyCalories: "",
  proteinsPercentage: "",
  carbsPercentage: "",
  fatsPercentage: "",
  weightGoal: "",
};

function formReducer(
  state: typeof initialState,
  action: { field: string; value: string | number }
) {
  return { ...state, [action.field]: action.value };
}

export default function RegisterNutritionScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isValidated, setIsValidated] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({
    dailyCaloriesError: null as string | null,
    proteinsPercentageError: null as string | null,
    carbsPercentageError: null as string | null,
    fatsPercentageError: null as string | null,
    macronutrientSumError: null as string | null,
    weightGoalError: null as string | null,
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [popupStatus, setPopupStatus] = useState<number | null>(null);

  const { isLoading, makeRequest } = useApiRequest();

  useEffect(() => {
    if (formData.weightGoal) {
      const fetchCaloriesSuggestion = async () => {
        const response = await makeRequest(() =>
          NutritionalGoalService.getCaloriesSuggestion(parseInt(formData.weightGoal))
        );

        console.log(response);

        if (response.success) {
          const { dailyCalories } = response.data as DailyCaloriesResponse;
          dispatch({ field: "dailyCalories", value: dailyCalories.toString() });
          dispatch({ field: "proteinsPercentage", value: "30" });
          dispatch({ field: "carbsPercentage", value: "50" });
          dispatch({ field: "fatsPercentage", value: "20" });
        } else {
          console.error("Erro ao obter sugestão de calorias:", response.message);
        }
      };

      fetchCaloriesSuggestion();
    }
  }, [formData.weightGoal]);

  useEffect(() => {
    if (isValidated) {
      validateStep();
    }
  }, [isValidated, formData, step]);

  const handleNutritionalGoalValidation = () => {
    const dailyCaloriesError = validateDailyCalories(formData.dailyCalories);
    const proteinsPercentageError = validateMacronutrientPercentage(
      formData.proteinsPercentage,
      "proteínas"
    );
    const carbsPercentageError = validateMacronutrientPercentage(
      formData.carbsPercentage,
      "carboidratos"
    );
    const fatsPercentageError = validateMacronutrientPercentage(
      formData.fatsPercentage,
      "gorduras"
    );
    const macronutrientSumError = validateMacronutrientSum(
      formData.proteinsPercentage,
      formData.carbsPercentage,
      formData.fatsPercentage
    );
    const weightGoalError = validateWeightGoal(formData.weightGoal);

    setErrors((prevErrors) => ({
      ...prevErrors,
      dailyCaloriesError,
      proteinsPercentageError,
      carbsPercentageError,
      fatsPercentageError,
      macronutrientSumError,
      weightGoalError,
    }));

    return (
      !dailyCaloriesError &&
      !proteinsPercentageError &&
      !carbsPercentageError &&
      !fatsPercentageError &&
      !macronutrientSumError &&
      !weightGoalError
    );
  };

  const handleRegister = async () => {
    const isDataValid = handleNutritionalGoalValidation();

    if (!isDataValid) {
      return;
    }

    const nutritionCredentials: NutritionalGoalRequest = {
      ...formData,
      dailyCalories: parseInt(formData.dailyCalories),
      proteinsPercentage: parseInt(formData.proteinsPercentage),
      carbsPercentage: parseInt(formData.carbsPercentage),
      fatsPercentage: parseInt(formData.fatsPercentage),
      weightGoal: parseInt(formData.weightGoal),
    };

    const response = await makeRequest(
      () => NutritionalGoalService.createGoal(nutritionCredentials),
      {
        successMessage: "Meta nutricional cadastrada com sucesso!",
        errorMessage: "Erro ao cadastrar meta nutricional. Tente novamente.",
      }
    );

    if (response.success) {
      setPopupMessage(response.message);
      setPopupStatus(response.status);
    } else {
      setPopupMessage(response.message);
      setPopupStatus(response.status);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      return !validateWeightGoal(formData.weightGoal);
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
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Meta Nutricional</Text>

        {isLoading && (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!isLoading && (
          <>
            {step === 1 && (
              <StepWeightGoal formData={formData} dispatch={dispatch} errors={errors} />
            )}
            {step === 2 && <StepMacrosAndCalories formData={formData} errors={errors} />}

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              {step > 1 && (
                <View style={{ flex: 1, marginRight: 5 }}>
                  <TouchableOpacity style={styles.button} onPress={prevStep}>
                    <Text style={styles.buttonText}>Voltar</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{ flex: 1, marginLeft: step > 1 ? 5 : 0 }}>
                {step < 2 ? (
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

        <Modal visible={!!popupMessage} transparent animationType="none">
          <PopupMessage
            message={popupMessage}
            onClose={() => setPopupMessage("")}
            redirectTo="/(tabs)"
            router={router}
            status={popupStatus}
          />
        </Modal>
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
