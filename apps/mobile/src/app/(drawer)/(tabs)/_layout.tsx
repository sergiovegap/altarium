// React
import React from "react";
import { Pressable } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
// Expo
import { Tabs, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
//Curstom
import ThemedTabIcon from "@/components/common/ThemedTabIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

const TabLayout = () => {
    const { accentColor, gold } = useThemeColor();
    const navigation = useNavigation();
    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer);
    };
    const pathname = usePathname();

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
                name="masses/index"
                options={{
                    title: "Misas",
                    headerTitle: "Misas",
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
                    headerShown: pathname === "/profile" ? true : false,
                    headerRightContainerStyle: {
                        padding: 8,
                    },
                    headerRight: () => (
                        <Pressable onPress={toggleDrawer}>
                            <FontAwesome
                                name="gear"
                                size={24}
                                color={accentColor}
                            />
                        </Pressable>
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
