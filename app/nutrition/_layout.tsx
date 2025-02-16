import { Stack } from "expo-router";
import React from "react";

export default function NutritionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "MyFood",
          headerStyle: {
            backgroundColor: "#007bff",
          },
          headerTintColor: "#fff",
          headerLeft: () => null,
        }}
      />
    </Stack>
  );
}
