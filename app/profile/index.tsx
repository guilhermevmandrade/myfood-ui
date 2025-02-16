import EditEnumModal from "@/components/EditEnumModal";
import EditNumberModal from "@/components/EditNumberModal";
import PopupMessage from "@/components/popupMessage";
import ProfileField from "@/components/ProfileField";
import { fieldLabels } from "@/constants/Labels";
import { activityLevelOptions, genderOptions } from "@/constants/Options";
import useApiRequest from "@/hooks/useApiRequest";
import { UserService } from "@/services/api";
import { UpdateUserRequest } from "@/types/user";
import { router } from "expo-router";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [tempValue, setTempValue] = useState("");
  const translateY = useRef(new Animated.Value(300)).current;

  const [popupMessage, setPopupMessage] = useState("");
  const [popupStatus, setPopupStatus] = useState<number | null>(null);

  const { isLoading, makeRequest } = useApiRequest();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserService.getUser();
        setUser(user.data);
      } catch (error) {
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, []);

  const isEnumField = (field: keyof typeof user) => {
    return ["gender", "activityLevel"].includes(String(field));
  };

  const openEditModal = (field: keyof typeof user) => {
    setSelectedField(String(field));
    setTempValue(user?.[field] || "");
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
    if (!selectedField || !user) return;

    setUser({ ...user, [selectedField]: tempValue });
    closeModal();
  };

  const handleSelect = (value: string) => {
    setUser({ ...user, [selectedField]: value });
    closeModal();
  };

  const getOptionsForField = (field: string) => {
    switch (field) {
      case "gender":
        return genderOptions;
      case "activityLevel":
        return activityLevelOptions;
      default:
        return [];
    }
  };

  const handleUpdate = async () => {
    const userCredentials: UpdateUserRequest = {
      ...user,
      age: parseInt(user.age),
      height: parseInt(user.height),
      weight: parseInt(user.weight),
      gender: parseInt(user.gender),
      activityLevel: parseInt(user.activityLevel),
    };

    const response = await makeRequest(() => UserService.updateUser(userCredentials), {
      successMessage: "Dados atualizados com sucesso!",
      errorMessage: "Erro ao atualizar dados. Tente novamente.",
    });

    if (response.success) {
      setPopupMessage(response.message);
      setPopupStatus(response.status);
    } else {
      setPopupMessage(response.message);
      setPopupStatus(response.status);
    }
  };

  if (!user) return null;

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
        label={fieldLabels["activityLevel"]}
        value={activityLevelOptions[user.activityLevel]?.label || ""}
        onPress={() => openEditModal("activityLevel")}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      <Modal visible={!!popupMessage} transparent animationType="none">
        <PopupMessage
          message={popupMessage}
          onClose={() => setPopupMessage("")}
          router={router}
          status={popupStatus}
        />
      </Modal>

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
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
