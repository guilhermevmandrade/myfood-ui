import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import { DeleteUserRequest, GetUserResponse, UpdateUserRequest } from "@/types/user";
import { FoodRequest, FoodResponse } from "@/types/food";
import { MealFoodRequest, MealRequest, MealResponse } from "@/types/meal";
import { DailyCaloriesRequest, DailyCaloriesResponse, MacrosPercentageRequest, MacrosPercentageResponse, NutritionalGoalRequest } from "@/types/goal";
import { WeightGoal } from "@/types/enums/weightGoal";

const API_BASE_URL = "https://localhost:44352/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para adicionar token JWT automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções para autenticação
export const AuthService = {
  login: async (request: LoginRequest) => {
    const response = await api.post<AuthResponse>("/auth/login", { request });
    await AsyncStorage.setItem("token", response.data.token);
    return response.data;
  },

  register: async (request: RegisterRequest) => {
    const response = await api.post("/auth/register", { request });
    return response.data;
  },
  
  logout: async () => {
    await AsyncStorage.removeItem("token");
  },
};

// Funções para CRUD de usuários
export const UserService = {
  getUser: async () => {
    const response = await api.get<GetUserResponse>("/users/me");
    return response.data;
  },

  updateUser: async (request: UpdateUserRequest) => {
    const response = await api.put("/users/me", { request });
    return response.data;
  },

  deleteUser: async (request: DeleteUserRequest) => {
    const response = await api.delete("/users/me");
    return response.data;
  },
};

// Funções para CRUD de alimentos
export const FoodService = {
  createFood: async (request: FoodRequest) => {
    const response = await api.post("/foods", { request });
    return response.data;
  },

  getAllFoods: async () => {
    const response = await api.get<FoodResponse[]>("/foods");
    return response.data;
  },

  getFood: async (id: string) => {
    const response = await api.get<FoodResponse>(`/foods/${id}`);
    return response.data;
  },

  updateFood: async (request: FoodRequest, id: string) => {
    const response = await api.put(`/foods/${id}`, { request });
    return response.data;
  },

  deleteFood: async (id: string) => {
    const response = await api.delete(`/foods/${id}`);
    return response.data;
  },
};

// Funções para gerenciamento de refeições
export const MealService = {
  createMeal: async (request: MealRequest) => {
    const response = await api.post("/meals", { request });
    return response.data;
  },

  getAllMeals: async () => {
    const response = await api.get<MealResponse[]>("/meals");
    return response.data;
  },

  getMeal: async (id: string) => {
    const response = await api.get<MealResponse>(`/meals/${id}`);
    return response.data;
  },

  updateMeal: async (request: MealRequest, id: string) => {
    const response = await api.put(`/meals/${id}`, { request });
    return response.data;
  },

  deleteMeal: async (id: string) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  },

  addFoodToMeal: async (request: MealFoodRequest, id: string, foodId: string) => {
    const response = await api.post(`/meals/${id}/foods/${foodId}`, { request });
    return response.data;
  },

  removeFoodFromMeal: async (id: string, foodId: string) => {
    const response = await api.delete(`/meals/${id}/foods/${foodId}`);
    return response.data;
  }
};

// Funções para gerenciamento de metas nutricionais
export const NutritionalGoalService = {
  createGoal: async (request: NutritionalGoalRequest) => {
    const response = await api.post("/goals", { request });
    return response.data;
  },

  getDailyCalories: async () => {
    const response = await api.get<DailyCaloriesResponse>("/goals/calories");
    return response.data;
  },

  updateDailyCalories: async (request: DailyCaloriesRequest) => {
    const response = await api.put("/goals/calories", { request });
    return response.data;
  },

  getCaloriesSuggestion: async (weightGoal: WeightGoal) => {
    const response = await api.get(`/goals/calories/suggestion/${weightGoal}`);
    return response.data;
  },

  getMacrosPercentage: async () => {
    const response = await api.get<MacrosPercentageResponse>("/goals/macros");
    return response.data;
  },

  updateMacrosPercentage: async (request: MacrosPercentageRequest) => {
    const response = await api.put("/goals/macors", { request });
    return response.data;
  },
};

export default api;
