import { ActivityLevel } from "@/types/enums/activityLevel";
import { Gender } from "@/types/enums/gender";
import { WeightGoal } from "@/types/enums/weightGoal";

export type Option = {
  label: string;
  value: ActivityLevel | WeightGoal | Gender;
};

export const activityLevelOptions: Option[] = [
  { label: "Sedentário", value: ActivityLevel.SEDENTARY },
  { label: "Leve", value: ActivityLevel.LIGHT },
  { label: "Moderado", value: ActivityLevel.MODERATE },
  { label: "Ativo", value: ActivityLevel.ACTIVE },
  { label: "Muito Ativo", value: ActivityLevel.ATHLETE },
];

export const weightGoalOptions: Option[] = [
  { label: "Perda de Peso", value: WeightGoal.LOSE },
  { label: "Manutenção", value: WeightGoal.MAINTAIN },
  { label: "Ganho de Massa", value: WeightGoal.GAIN },
];

export const genderOptions: Option[] = [
  { label: "Masculino", value: Gender.MALE },
  { label: "Feminino", value: Gender.FEMALE },
];