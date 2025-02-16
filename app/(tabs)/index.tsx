import { DailyCaloriesResponse } from "@/types/goal";
import { GetUserResponse } from "@/types/user";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { AuthService, NutritionalGoalService, UserService } from "../../services/api";
import useApiRequest from "@/hooks/useApiRequest";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<GetUserResponse>();
  const [dailyCalories, setDailyCalories] = useState<DailyCaloriesResponse>();
  const { isLoading, makeRequest } = useApiRequest();

  const fetchUser = async () => {
    try {
      const response = await makeRequest(() => UserService.getUser());
      if (response.success) {
        setUser(response.data as GetUserResponse);
      } else {
        router.push("/auth/login");
      }      
    } catch (error) {
      router.push("/auth/login");
    }
  };

  const fetchGoal = async () => {
    try {
      const response = await makeRequest(() => NutritionalGoalService.getDailyCalories());
      if (response.success) {
        setDailyCalories(response.data as DailyCaloriesResponse);
      } else {
        router.push("/nutrition");
      }      
    } catch (error) {
      router.push("/nutrition");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
      await fetchGoal();
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {!isLoading && (
        <>
          <Text style={styles.title}>Olá, {user?.name}!</Text>
          <View style={styles.separator} />
          <Button
            title="Sair"
            onPress={() => AuthService.logout().then(() => router.push("/auth/login"))}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
});
