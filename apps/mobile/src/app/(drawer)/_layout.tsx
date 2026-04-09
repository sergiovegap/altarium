// React
import React from "react";
// Expo
import { Drawer } from "expo-router/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
// Components
import CustomDrawer from "@/components/ui/CustomDrawer";
import { useThemeColor } from "@/hooks/useThemeColor";

const ProfileDrawerLayout = () => {
    const { accentColor } = useThemeColor();

    return (
        <Drawer
            drawerContent={CustomDrawer}
            screenOptions={{
                drawerPosition: "right",
                headerShown: false,
                headerShadowVisible: false,
                swipeEnabled: false,
                overlayColor: "rgba(0, 0, 0, 0.4)",
                drawerActiveTintColor: accentColor,
                sceneStyle: {
                    backgroundColor: "white",
                },
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerItemStyle: { display: "none" },
                }}
            />
            <Drawer.Screen
                name="account/index"
                options={{
                    drawerLabel: "Cuenta",
                    title: "Cuenta",
                    headerShown: true,
                    drawerLabelStyle: { color: "black" },
                    drawerActiveTintColor: "white",
                    drawerActiveBackgroundColor: accentColor,
                    drawerInactiveTintColor: "white",
                    drawerIcon: ({ size }) => (
                        <FontAwesome5
                            name="user-cog"
                            color="black"
                            size={size}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="settings/index"
                options={{
                    drawerLabel: "Ajustes",
                    title: "Ajustes",
                    headerShown: true,
                    drawerLabelStyle: { color: "black" },
                    drawerActiveTintColor: "white",
                    drawerActiveBackgroundColor: accentColor,
                    drawerInactiveTintColor: "white",
                    drawerIcon: ({ size }) => (
                        <FontAwesome name="gear" color="black" size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="privacy/index"
                options={{
                    drawerLabel: "Privacidad",
                    title: "Privacidad",
                    headerShown: true,
                    drawerLabelStyle: { color: "black" },
                    drawerActiveTintColor: "white",
                    drawerActiveBackgroundColor: accentColor,
                    drawerInactiveTintColor: "white",
                    drawerIcon: ({ size }) => (
                        <FontAwesome
                            name="user-secret"
                            color="black"
                            size={size}
                        />
                    ),
                }}
            />
        </Drawer>
    );
};

export default ProfileDrawerLayout;
