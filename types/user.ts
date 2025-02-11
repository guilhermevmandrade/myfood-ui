import { ActivityLevel } from "./enums/activityLevel";
import { Gender } from "./enums/gender";

export interface UpdateUserRequest {
    name: string;
    gender: Gender;
    age: number;
    weight: number;
    height: number;
    activityLevel: ActivityLevel;
}

export interface DeleteUserRequest {
    password: string;
}

export interface GetUserResponse {
    name: string;
    email: string;
    gender: Gender;
    age: number;
    weight: number;
    height: number;
    activityLevel: ActivityLevel;
}

