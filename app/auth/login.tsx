import { LoginRequest } from "@/types/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthService } from "../../services/api";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    if (password.trim().length === 0) {
      Alert.alert("Erro", "A senha não pode estar vazia.");
      return;
    }

    try {
      setIsLoading(true);
      const credentials: LoginRequest = { email, password };
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
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Login
      </Text>
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
      <Button title="Entrar" onPress={handleLogin} />

      {isLoading && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* Texto para navegar para a tela de registro */}
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text style={{ color: "blue" }}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
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
};
