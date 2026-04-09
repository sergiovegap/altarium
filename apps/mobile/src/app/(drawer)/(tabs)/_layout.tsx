// React
import React from "react";
// Expo
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
//Curstom
import ThemedTabIcon from "@/components/common/ThemedTabIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

const TabLayout = () => {
    const { accentColor } = useThemeColor();

    return (
        <Tabs
            screenOptions={{
                headerTitle: "",
                headerShadowVisible: false,
                headerShown: false,
                tabBarActiveTintColor: accentColor,
            }}
        >
            <Tabs.Screen
                name="masses/index"
                options={{
                    title: "Misas",
                    tabBarIcon: ({ color }) => (
                        <ThemedTabIcon
                            icon={require("@/assets/icons/eucharist-fill.png")}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="altarboys/index"
                options={{
                    title: "Monaguillos",
                    tabBarIcon: ({ color }) => (
                        <ThemedTabIcon
                            icon={require("@/assets/icons/altar-boy-thurible.png")}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="formation/index"
                options={{
                    title: "Formación",
                    tabBarIcon: ({ color }) => (
                        <ThemedTabIcon
                            icon={require("@/assets/icons/cathecism-fill.png")}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ai/index"
                options={{
                    title: "AI",
                    tabBarIcon: ({ color }) => (
                        <ThemedTabIcon
                            icon={require("@/assets/icons/ai-christian-fill.png")}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
