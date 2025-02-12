import { FoodRequest } from "@/types/food";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { FoodService } from "../../services/api";

export default function FoodsScreen() {
  const [foods, setFoods] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [proteins, setProteins] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const fetchFoods = async () => {
    const foods = await FoodService.getAllFoods();
    setFoods(foods);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleAddFood = async () => {
    const food: FoodRequest = {
      name: name,
      calories: parseInt(calories),
      proteins: parseInt(proteins),
      carbs: parseInt(carbs),
      fats: parseInt(fats),
    };

    await FoodService.createFood(food);

    setName("");
    setCalories("");
    setProteins("");
    setCarbs("");
    setFats("");

    fetchFoods();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Alimentos</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Calorias"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Proteínas"
        value={proteins}
        onChangeText={setProteins}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Carboidratos"
        value={carbs}
        onChangeText={setCarbs}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Gorduras"
        value={fats}
        onChangeText={setFats}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Adicionar Alimento" onPress={handleAddFood} />
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>
              {item.name} - {item.calories} kcal
            </Text>
            <Button
              title="X"
              onPress={() => FoodService.deleteFood(item.id).then(fetchFoods)}
            />
          </View>
        )}
      />
    </View>
  );
}
