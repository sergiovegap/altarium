// React
import React from "react";
// Expo
import { Pressable, Image } from "react-native";
import { router, Stack, usePathname } from "expo-router";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";

const MassesLayout = () => {
    const pathname = usePathname();
    const { accentColor } = useThemeColor();

    return (
        <Stack
            initialRouteName="index"
            screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                contentStyle: { backgroundColor: "white" },
                animation: "fade",
                headerLeft: () =>
                    pathname !== "/(drawer)/(tabs)/masses" && (
                        <Pressable onPress={() => router.back()}>
                            <Image
                                source={require("@/assets/icons/arrow-left.png")}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: accentColor,
                                }}
                            />
                        </Pressable>
                    ),
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[day]/index"
                options={{
                    title: "Misas del día",
                    // headerTitle: "Misas del día",
                }}
            />
            <Stack.Screen
                name="[day]/[id]"
                options={{
                    title: "Detalle de la misa",
                    // headerTitle: "Detalle de la misa",
                }}
            />
        </Stack>
    );
};

export default MassesLayout;
