import { WeightGoal } from "./enums/weightGoal";

export interface NutritionalGoalRequest {
    dailyCalories: number;
    proteinsPercentage: number;
    carbsPercentage: number;
    fatsPercentage: number;
    weightGoal: WeightGoal;
}

export interface DailyCaloriesRequest {
    dailyCalories: number;
    weightGoal: WeightGoal;
}

export interface MacrosPercentageRequest {
    proteinsPercentage: number;
    carbsPercentage: number;
    fatsPercentage: number;
}

export interface DailyCaloriesResponse {
    dailyCalories: number;
    weightGoal: WeightGoal;
}

export interface MacrosPercentageResponse {
    proteinsPercentage: number;
    carbsPercentage: number;
    fatsPercentage: number;
}