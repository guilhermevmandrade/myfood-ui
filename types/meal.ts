import { MeasurementUnit } from "./enums/measurementUnit";
import { FoodResponse } from "./food";

export interface MealRequest {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
}

export interface MealFoodRequest {
    quantity: number;
    unit: MeasurementUnit;
}

export interface MealFoodResponse {
    mealFoodId: number;
    quantity: number;
    unit: MeasurementUnit;
    food: FoodResponse; 
}
  
export interface MealResponse {
    mealId: number;
    description: string;
    mealTime: Date;
    mealFoods: MealFoodResponse[];
}