// React
import React from "react";
// Expo
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

const ProfileLayout = () => {
    const { accentColor } = useThemeColor();

    return (
        <Stack
            screenOptions={{
                headerShadowVisible: true,
                contentStyle: {
                    backgroundColor: "white",
                },
                animation: "slide_from_right",
                headerShown: false,
                presentation: "card",
                headerTitleStyle: {
                    color: accentColor,
                },
            }}
        >
            <Stack.Screen
                name="profile/index"
                options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
                name="privacy/index"
                options={{
                    title: "Privacidad",
                }}
            />
            <Stack.Screen
                name="settings/index"
                options={{
                    title: "Ajustes",
                }}
            />
            <Stack.Screen
                name="account/index"
                options={{
                    title: "Cuenta",
                }}
            />
        </Stack>
    );
};

export default ProfileLayout;
