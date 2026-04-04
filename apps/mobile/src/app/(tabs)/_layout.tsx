// React
import React from "react";
// Expo
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import ThemedTabIcon from "@/components/shared/ThemedTabIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

const RootLayout = () => {

  const { accentColor } = useThemeColor();

  return (
    <Tabs screenOptions={{
      headerTitle: "",
      headerShadowVisible: false,
      headerShown: false,
      tabBarActiveTintColor: accentColor,
    }}>
      <Tabs.Screen name="masses" options={{ title: "Misas", tabBarIcon: ({ color }) => (<ThemedTabIcon icon={require("@/assets/icons/eucharist-fill.png")} color={color} />) }} />
      <Tabs.Screen name="altarboys" options={{ title: "Monaguillos", tabBarIcon: ({ color }) => (<ThemedTabIcon icon={require("@/assets/icons/altar-boy-fill.png")} color={color} />) }} />
      <Tabs.Screen name="formation" options={{ title: "Formación", tabBarIcon: ({ color }) => (<ThemedTabIcon icon={require("@/assets/icons/cathecism-fill.png")} color={color} />) }} />
      <Tabs.Screen name="ai" options={{ title: "AI", tabBarIcon: ({ color }) => (<ThemedTabIcon icon={require("@/assets/icons/ai-christian-fill.png")} color={color} />) }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil", tabBarIcon: ({ color }) => (<FontAwesome name="user" size={24} color={color} />) }} />
    </Tabs>
  )
}

export default RootLayout;