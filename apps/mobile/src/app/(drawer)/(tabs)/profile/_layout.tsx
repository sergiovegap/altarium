// React
import React from "react";
import { Platform } from "react-native";
// Expo
import { Stack, usePathname } from "expo-router";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";
import DrawerIconButton from "@/components/common/DrawerIconButton";
import HeaderBackButton from "@/components/common/HeaderBackButton";
import HeaderDownButton from "@/components/common/HeaderDownButton";

const ProfileLayout = () => {
    const { accentColor } = useThemeColor();
    const pathname = usePathname();
    const isAndroid = Platform.OS === "android";

    return (
        <Stack
            initialRouteName="index"
            screenOptions={{
                headerShown: true,
                presentation: "card",
                animation: "fade",
                animationDuration: 100,
                headerTitleStyle: {
                    color: accentColor,
                    fontSize: 20,
                    fontWeight: "bold",
                },
                headerTitleAlign: "center",
                headerLeft: () =>
                    pathname !== "/(drawer)/(tabs)/profile" && (
                        <HeaderBackButton
                            color={accentColor}
                            href={"/(drawer)/(tabs)/profile"}
                        />
                    ),
                headerRight: () => (
                    <DrawerIconButton accentColor={accentColor} />
                ),
                contentStyle: {
                    backgroundColor: "white",
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    headerTitle: "Perfil",
                }}
            />
            <Stack.Screen
                name="account/index"
                options={{
                    headerTitle: "Cuenta",
                }}
            />
            <Stack.Screen
                name="settings/index"
                options={{
                    headerTitle: "Ajustes",
                }}
            />
            <Stack.Screen
                name="privacy/index"
                options={{
                    headerTitle: "Privacidad",
                }}
            />
            <Stack.Screen
                name="user-masses-list/index"
                options={{
                    headerTitle: "Mis Misas",
                }}
            />
            <Stack.Screen
                name="liturgical-items/index"
                options={{
                    headerShown: true,
                    title: "Mis Objetos Litúrgicos",
                    presentation: isAndroid ? "card" : "modal",
                    animation: "fade_from_bottom",
                    headerLeft: () => (isAndroid ? <HeaderDownButton /> : null),
                    headerRight: () => null,
                    headerBackVisible: false,
                }}
            />
        </Stack>
    );
};

export default ProfileLayout;
