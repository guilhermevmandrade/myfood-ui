import { RegisterRequest } from "@/types/auth";
import { ActivityLevel } from "@/types/enums/activityLevel";
import { Gender } from "@/types/enums/gender";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthService } from "../../services/api";

export default function RegisterScreen() {
  const router = useRouter();

  // Etapas do cadastro
  const [step, setStep] = useState(1);

  // Estado para armazenar os dados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(-1);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState(-1);
  const [weightGoal, setWeightGoal] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (password.trim().length === 0) {
      Alert.alert("Erro", "A senha não pode estar vazia.");
      return;
    }

    try {
      setIsLoading(true);

      const userCredentials: RegisterRequest = {
        name: name,
        email: email,
        password: password,
        gender: gender,
        age: parseInt(age),
        height: parseInt(height),
        weight: parseInt(weight),
        activityLevel: activityLevel,
      };
      await AuthService.register(userCredentials);

      // const goalCredentials: NutritionalGoalRequest = {
      //     dailyCalories: 2000,
      //     proteinsPercentage: 20,
      //     carbsPercentage: 50,
      //     fatsPercentage: 30,
      //     weightGoal: weightGoal,
      // };

      // console.log("goalCredentials:", goalCredentials);

      // await NutritionalGoalService.createGoal(goalCredentials);

      router.push("/(tabs)");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha no registro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Cadastro
        </Text>

        {step === 1 && (
          <View>
            <Text style={{ marginBottom: 5 }}>Nome</Text>
            <TextInput
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <Text style={{ marginBottom: 5 }}>Email</Text>
            <TextInput
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />

            <Text style={{ marginBottom: 5 }}>Senha</Text>
            <TextInput
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <Text style={{ marginBottom: 5 }}>Confirmação de Senha</Text>
            <TextInput
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
            />

            <Button title="Próximo" onPress={nextStep} />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={{ marginBottom: 5 }}>Gênero</Text>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue: number) =>
                setGender(Number(itemValue))
              }
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value={-1} />
              <Picker.Item label="Masculino" value={Gender.MALE} />
              <Picker.Item label="Feminino" value={Gender.FEMALE} />
            </Picker>

            <Text style={{ marginBottom: 5 }}>Idade</Text>
            <TextInput
              placeholder="Digite sua idade"
              value={age}
              onChangeText={setAge}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={{ marginBottom: 5 }}>Altura (em cm)</Text>
            <TextInput
              placeholder="Digite sua altura"
              value={height}
              onChangeText={setHeight}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={{ marginBottom: 5 }}>Peso (em kg)</Text>
            <TextInput
              placeholder="Digite seu peso"
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={{ marginBottom: 5 }}>Nível de Atividade</Text>
            <Picker
              selectedValue={activityLevel}
              onValueChange={(itemValue: number) =>
                setActivityLevel(Number(itemValue))
              }
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value={-1} />
              <Picker.Item
                label="Pouco ou nenhum exercício"
                value={ActivityLevel.SEDENTARY}
              />
              <Picker.Item
                label="Exercício leve (1 a 3 dias por semana)"
                value={ActivityLevel.LIGHT}
              />
              <Picker.Item
                label="Exercício moderado (3 a 5 dias por semana)"
                value={ActivityLevel.MODERATE}
              />
              <Picker.Item
                label="Exercício intenso (6 a 7 dias por semana)"
                value={ActivityLevel.ACTIVE}
              />
              <Picker.Item
                label="Atleta ou trabalho físico pesado"
                value={ActivityLevel.ATHLETE}
              />
            </Picker>
            {/* 
                        <Text style={{ marginBottom: 5 }}>Objetivo</Text>
                        <Picker
                            selectedValue={weightGoal}
                            onValueChange={(itemValue: number) => setWeightGoal(Number(itemValue))}
                            style={styles.picker}
                        >
                            <Picker.Item label="Selecione..." value={-1} />
                            <Picker.Item label="Perder peso" value={WeightGoal.LOSE} />
                            <Picker.Item label="Manter peso" value={WeightGoal.MAINTAIN} />
                            <Picker.Item label="Ganhar peso" value={WeightGoal.GAIN} />
                        </Picker> */}

            <Button title="Cadastrar" onPress={handleRegister} />
          </View>
        )}

        {isLoading && (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        )}

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text style={{ color: "blue" }}>Já tem conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#333",
    backgroundColor: "#fff",
    placeholderTextColor: "#bbb",
  },
  picker: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderColor: "#ccc",
    borderRadius: 5,
  },
};
