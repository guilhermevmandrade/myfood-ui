export interface FoodRequest {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
}

export interface FoodResponse {
    foodId: number;
    name: string,
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
}