// React
import React from "react";
import { Text, View } from "react-native";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";
import ShadowLine from "./ShadowLine";

interface Props {
    title: string;
    className?: string;
}

const ThemedHeaderTitle = ({ title, className }: Props) => {
    const { accentColor } = useThemeColor();

    return (
        <View className={className}>
            <View className="flex flex-row justify-center items-center mb-4">
                <Text
                    className="text-primary text-xl"
                    style={{
                        color: accentColor,
                        fontSize: 20,
                        fontWeight: "bold",
                    }}
                >
                    {title}
                </Text>
            </View>
            <ShadowLine width={"100%"} />
        </View>
    );
};

export default ThemedHeaderTitle;
