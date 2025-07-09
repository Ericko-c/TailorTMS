import React, { useEffect } from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { View } from "react-native";
// import NotificationListener from "../components/NotificationListener";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "index" }}
        />
        <Stack.Screen
          name="Signin"
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="Signup"
          options={{ headerShown: true, title: " " }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="Recovery"
          options={{ 
          headerShown:true,
          title: "",
          headerStyle: { backgroundColor: "#145A32" },
          headerTintColor: "#EBF6FE",
        }}
        />
        <Stack.Screen
          name="Recovery2"
          options={{ 
          headerShown:true,
          title: "",
          headerStyle: { backgroundColor: "#145A32" },
          headerTintColor: "#EBF6FE",
        }}
        />
        <Stack.Screen
          name="UserNotifications"
          options={{
            headerShown: true,
            title: "Notifications",
            headerStyle: { backgroundColor: "#145A32" },
            headerTintColor: "#EBF6FE",
          }}
        />
      </Stack>
      {/* <NotificationListener /> */}
      <Toast />
    </View>
  );
}