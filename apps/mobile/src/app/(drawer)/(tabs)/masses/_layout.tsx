// React
import React from "react";
// Expo
import { Pressable, Image } from "react-native";
import { router, Stack, usePathname } from "expo-router";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomButton from "@/components/common/CustomButton";

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
                headerLeft: () => (
                    <CustomButton
                        onPress={() => router.back()}
                        color={accentColor}
                        iconSource={require("@/assets/icons/arrow-left.png")}
                    />
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
                }}
            />
            <Stack.Screen
                name="[day]/[id]"
                options={{
                    title: "Detalle de la misa",
                }}
            />
        </Stack>
    );
};

export default MassesLayout;
