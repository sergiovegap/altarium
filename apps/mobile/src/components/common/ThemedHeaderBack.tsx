// React
import React from "react";
import { Text, View } from "react-native";
// Custom
import HeaderBackButton from "@/components/common/HeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import ShadowLine from "./ShadowLine";

interface Props {
    title: string;
}

const ThemedHeaderBack = ({ title }: Props) => {
    const { accentColor } = useThemeColor();

    return (
        <View>
            <View className="flex flex-row justify-between items-center mb-4">
                <HeaderBackButton color={accentColor} />
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
                <View></View>
            </View>
            <ShadowLine width={"100%"} />
        </View>
    );
};

export default ThemedHeaderBack;
