import DonutPieChart from "@/components/donutPieChart";
import EditEnumModal from "@/components/EditEnumModal";
import EditNumberModal from "@/components/EditNumberModal";
import ProfileField from "@/components/ProfileField";
import { fieldLabels } from "@/constants/Labels";
import { weightGoalOptions } from "@/constants/Options";
import { NutritionalGoalService } from "@/services/api";
import { router } from "expo-router";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GoalsTab() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string>("");
  const [goal, setGoal] = useState<any>(null);
  const [macros, setMacros] = useState<any>(null);
  const [tempValue, setTempValue] = useState("");
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goal = await NutritionalGoalService.getDailyCalories();
        const macros = await NutritionalGoalService.getMacrosPercentage();
        setGoal(goal.data);
        setMacros(macros.data);
      } catch (error) {
        router.push("/nutrition");
      }
    };

    fetchGoal();
  }, []);

  const isEnumField = (field: keyof typeof goal) => {
    return ["weightGoal"].includes(String(field));
  };

  const openEditModal = (field: keyof typeof goal) => {
    setSelectedField(String(field));
    setTempValue(goal?.[field] || "");
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedField("");
    });
  };

  const handleSave = () => {
    if (!selectedField || !goal) return;

    setGoal({ ...goal, [selectedField]: tempValue });
    closeModal();
  };

  const handleSelect = (value: string) => {
    setGoal({ ...goal, [selectedField]: value });
    closeModal();
  };

  const getOptionsForField = (field: string) => {
    switch (field) {
      case "weightGoal":
        return weightGoalOptions;
      default:
        return [];
    }
  };

  if (!goal || !macros) return null;

  return (
    <View style={styles.container}>
      <ProfileField
        label={fieldLabels["weightGoal"]}
        value={weightGoalOptions[goal.weightGoal]?.label || ""}
        onPress={() => openEditModal("weightGoal")}
      />
      <ProfileField
        label={fieldLabels["dailyCalories"]}
        value={goal.dailyCalories}
        onPress={() => openEditModal("dailyCalories")}
      />
      <DonutPieChart
        proteinsPercentage={macros.proteinsPercentage}
        carbsPercentage={macros.carbsPercentage}
        fatsPercentage={macros.fatsPercentage}
      />

      {isEnumField(selectedField) ? (
        <EditEnumModal
          visible={modalVisible}
          translateY={translateY}
          selectedField={selectedField}
          label={selectedField ? fieldLabels[selectedField] : ""}
          options={getOptionsForField(selectedField || "")}
          handleSelect={handleSelect}
          closeModal={closeModal}
        />
      ) : (
        <EditNumberModal
          visible={modalVisible}
          translateY={translateY}
          selectedField={selectedField}
          label={selectedField ? fieldLabels[selectedField] : ""}
          tempValue={tempValue}
          setTempValue={setTempValue}
          handleSave={handleSave}
          closeModal={closeModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});