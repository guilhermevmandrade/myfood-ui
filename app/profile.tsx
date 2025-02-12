import EditEnumModal from "@/components/EditEnumModal";
import EditNumberModal from "@/components/EditNumberModal";
import ProfileField from "@/components/ProfileField";
import { fieldLabels } from "@/constants/Labels";
import {
  activityLevelOptions,
  genderOptions,
  weightGoalOptions,
} from "@/constants/Options";
import { NutritionalGoalService, UserService } from "@/services/api";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function ProfileModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [goal, setGoal] = useState<any>(null);
  const [tempValue, setTempValue] = useState("");
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userData, goalData] = await Promise.all([
          UserService.getUser(),
          NutritionalGoalService.getDailyCalories(),
        ]);
        setUser(userData);
        setGoal(goalData);
      } catch (error) {
        router.push("/auth/login");
      }
    };
    fetchUserData();
  }, []);

  const isEnumField = (field: keyof typeof user | keyof typeof goal) => {
    return (
      ["gender", "activityLevel"].includes(String(field)) ||
      ["weightGoal"].includes(String(field))
    );
  };

  const openEditModal = (field: keyof typeof user | keyof typeof goal) => {
    setSelectedField(String(field));
    setTempValue(user?.[field] || goal?.[field] || "");
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
    if (!selectedField || (!user && !goal)) return;

    if (selectedField in user) {
      setUser({ ...user, [selectedField]: tempValue });
    } else {
      setGoal({ ...goal, [selectedField]: tempValue });
    }

    closeModal();
  };

  const handleSelect = (value: string) => {
    console.log(goal);

    if (selectedField in user) {
      setUser({ ...user, [selectedField]: value });
    } else {
      setGoal({ ...goal, [selectedField]: value });
    }
    closeModal();
    console.log(goal);
  };

  const getOptionsForField = (field: string) => {
    switch (field) {
      case "gender":
        return genderOptions;
      case "activityLevel":
        return activityLevelOptions;
      case "weightGoal":
        return weightGoalOptions;
      default:
        return [];
    }
  };

  if (!user || !goal) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>{user.email}</Text>
      <View style={styles.separator} />

      <ProfileField
        label={fieldLabels["height"]}
        value={user.height}
        onPress={() => openEditModal("height")}
      />
      <ProfileField
        label={fieldLabels["weight"]}
        value={user.weight}
        onPress={() => openEditModal("weight")}
      />
      <ProfileField
        label={fieldLabels["gender"]}
        value={genderOptions[user.gender]?.label || ""}
        onPress={() => openEditModal("gender")}
      />
      <ProfileField
        label={fieldLabels["age"]}
        value={user.age}
        onPress={() => openEditModal("age")}
      />
      <ProfileField
        label={fieldLabels["weightGoal"]}
        value={weightGoalOptions[goal.weightGoal]?.label || ""}
        onPress={() => openEditModal("weightGoal")}
      />
      <ProfileField
        label={fieldLabels["activityLevel"]}
        value={activityLevelOptions[user.activityLevel]?.label || ""}
        onPress={() => openEditModal("activityLevel")}
      />
      <ProfileField
        label={fieldLabels["dailyCalories"]}
        value={goal.dailyCalories}
        onPress={() => openEditModal("dailyCalories")}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    backgroundColor: "#ededed",
  },
});
