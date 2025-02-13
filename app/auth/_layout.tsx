import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login/index"
        options={{
          title: "MyFood",
          headerStyle: {
            backgroundColor: "#007bff",
          },
          headerTintColor: "#fff",
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="register/index"
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
