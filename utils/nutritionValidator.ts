export const validateDailyCalories = (caloriesInput: string): string | null => {
  const calories = parseInt(caloriesInput);
  if (!caloriesInput) return "A meta de calorias diárias é obrigatória.";
  if (isNaN(calories)) return "A meta de calorias diárias deve ser um número válido.";
  if (calories <= 0) return "A meta de calorias diárias deve ser maior que zero.";
  if (calories > 10000) return "A meta de calorias diárias não pode ultrapassar 10.000 calorias.";
  return null;
};

export const validateMacronutrientPercentage = (
  percentageInput: string,
  type: string
): string | null => {
  const percentage = parseInt(percentageInput);
  if (!percentageInput) return `O percentual de ${type} é obrigatório.`;
  if (isNaN(percentage)) return `O percentual de ${type} deve ser um número válido.`;
  if (percentage < 0 || percentage > 100)
    return `O percentual de ${type} deve estar entre 0 e 100.`;
  return null;
};

export const validateMacronutrientSum = (
  proteinsInput: string,
  carbsInput: string,
  fatsInput: string
): string | null => {
  const proteins = parseInt(proteinsInput);
  const carbs = parseInt(carbsInput);
  const fats = parseInt(fatsInput);

  if (isNaN(proteins) || isNaN(carbs) || isNaN(fats))
    return "Todos os percentuais de macronutrientes devem ser números válidos.";

  const sum = proteins + carbs + fats;
  if (sum !== 100)
    return "A soma dos percentuais de proteínas, carboidratos e gorduras deve ser igual a 100.";
  return null;
};

export const validateWeightGoal = (goalInput: string): string | null => {
  const goal = parseInt(goalInput);
  if (!goalInput) return "O objetivo de peso é obrigatório.";
  if (isNaN(goal)) return "O objetivo de peso deve ser um número válido.";
  return null;
};
