// React
import React from "react";
import { Pressable, Image } from "react-native";
// Expo
import { router } from "expo-router";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";

const HeaderDownButton = () => {
    const { accentColor } = useThemeColor();

    return (
        <Pressable onPress={() => router.back()}>
            <Image
                source={require("@/assets/icons/arrow-down.png")}
                style={{
                    width: 24,
                    height: 24,
                    tintColor: accentColor,
                }}
            />
        </Pressable>
    );
};

export default HeaderDownButton;
