import { ActivityLevel } from "@/types/enums/activityLevel";
import { Gender } from "@/types/enums/gender";

export const validateName = (name: string): string | null => {
  if (!name) return "O nome é obrigatório.";
  if (name.length > 100) return "O nome pode ter no máximo 100 caracteres.";
  return null;
};

export const validateEmail = (email: string): string | null => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "O e-mail é obrigatório.";
  if (!regex.test(email)) return "E-mail inválido.";
  if (email.length > 100) return "O e-mail pode ter no máximo 100 caracteres.";
  return null;
};

export const validatePasswordLogin = (password: string): string | null => {
  if (!password) return "A senha é obrigatória.";
  if (password.trim().length === 0) return "A senha não pode estar vazia.";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "A senha é obrigatória.";
  if (password.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (!/[A-Z]/.test(password)) return "A senha deve conter pelo menos uma letra maiúscula.";
  if (!/[a-z]/.test(password)) return "A senha deve conter pelo menos uma letra minúscula.";
  if (!/\d/.test(password)) return "A senha deve conter pelo menos um número.";
  if (!/[\@\!\#\$\%\^\&\*\(\)\+\-\=]/.test(password))
    return "A senha deve conter pelo menos um caractere especial (@, !, #, $, etc.).";
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  return password !== confirmPassword ? "As senhas não coincidem." : null;
};

export const validateAge = (age: string): string | null => {
  const ageNum = parseInt(age, 10);
  if (!age) return "A idade é obrigatória.";
  if (isNaN(ageNum) || ageNum > 100) return "A idade deve ser um número menor que 100.";
  return null;
};

export const validateGender = (gender: string): string | null => {
  if (!gender) return "O gênero é obrigatório.";
  const validGenders = [String(Gender.MALE), String(Gender.FEMALE)];
  if (!validGenders.includes(gender)) return "Selecione um gênero válido.";
  return null;
};

export const validateHeight = (height: string): string | null => {
  const heightNum = parseInt(height);
  if (!height) return "A altura é obrigatória.";
  if (isNaN(heightNum) || heightNum <= 0 || heightNum > 250)
    return "A altura deve ser um número entre 0 e 250 cm.";
  return null;
};

export const validateWeight = (weight: string): string | null => {
  const weightNum = parseInt(weight);
  if (!weight) return "O peso é obrigatório.";
  if (isNaN(weightNum) || weightNum <= 0 || weightNum > 500)
    return "O peso deve ser um número entre 0 e 500 kg.";
  return null;
};

export const validateActivityLevel = (activityLevel: string): string | null => {
  if (!activityLevel) return "O nível de atividade é obrigatório.";

  const validLevels = [
    ActivityLevel.SEDENTARY,
    ActivityLevel.LIGHT,
    ActivityLevel.MODERATE,
    ActivityLevel.ACTIVE,
    ActivityLevel.ATHLETE,
  ];

  if (isNaN(parseInt(activityLevel)) || !validLevels.includes(parseInt(activityLevel))) {
    return "Selecione um nível de atividade válido.";
  }
  return null;
};
