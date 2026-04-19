// React
import React from "react";
import { Pressable, Image } from "react-native";
// Expo
import { router, Stack, usePathname } from "expo-router";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";

const AltarBoysLayout = () => {
    const { accentColor, gold, gold_100, gold_600 } = useThemeColor();
    const pathname = usePathname();

    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: "white" },
                presentation: "card",
                animation: "fade",
                animationDuration: 100,
                headerTitleAlign: "center",
                headerLeft: () =>
                    pathname !== "/(drawer)/(tabs)/masses" && (
                        <Pressable onPress={() => router.back()}>
                            <Image
                                source={require("@/assets/icons/arrow-left.png")}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: "black",
                                }}
                            />
                        </Pressable>
                    ),
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="[id]"
                options={{}}
                dangerouslySingular={(id) => id}
            />
        </Stack>
    );
};

export default AltarBoysLayout;
