// React
import React from "react";
// Expo
import { Tabs, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
//Curstom
import ThemedTabIcon from "@/components/common/ThemedTabIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import DrawerIconButton from "@/components/common/DrawerIconButton";
import { Platform } from "react-native";

const TabLayout = () => {
    const { accentColor, gold } = useThemeColor();
    const pathname = usePathname();
    const isAndroid = Platform.OS === "android";

    return (
        <Tabs
            screenOptions={{
                // headerShadowVisible: false,
                headerShown: true,
                sceneStyle: {
                    backgroundColor: "white",
                },
                headerStyle: {
                    backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerTitleStyle: {
                    color: accentColor,
                    fontSize: 20,
                    fontWeight: "bold",
                },
                tabBarActiveTintColor: gold,
                tabBarInactiveTintColor: "white",
                tabBarStyle: {
                    // backgroundColor: "white",
                    backgroundColor: accentColor,
                },
            }}
        >
            <Tabs.Screen
                name="masses"
                options={{
                    title: "Misas",
                    headerTitle: "Misas",
                    tabBarIcon: ({ color }) => (
                        <ThemedTabIcon
                            icon={require("@/assets/icons/cristian-calendar-fill.png")}
                            // icon={require("@/assets/icons/eucharist-fill.png")}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="altarboys/index"
                options={{
                    title: "Monaguillos",
                    headerTitle: "Monaguillos",
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
                    headerTitle: "Formación",
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
                    headerTitle: "Magisterium",
                    tabBarIcon: ({ color }) => (
                        <ThemedTabIcon
                            icon={require("@/assets/icons/ai-christian-fill.png")}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    headerTitle: "Perfil",
                    // headerShown: pathname === "/profile" ? true : false },
                    // headerShown: isAndroid && pathname === "/profile" ? false : true,
                    // headerShown: true,
                    headerRightContainerStyle: {
                        padding: 8,
                    },
                    headerRight: () => (
                        <DrawerIconButton accentColor={accentColor} />
                    ),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
