import { ActivityLevel } from "./enums/activityLevel";
import { Gender } from "./enums/gender";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    gender: Gender;
    age: number;
    height: number;
    weight: number;
    activityLevel: ActivityLevel;
}

export interface AuthResponse {
    token: string;
    name: string;
    email: string;
}
