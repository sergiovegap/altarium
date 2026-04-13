// React
import React from "react";
import { Pressable, Text, View } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
// Expo
import { FontAwesome } from "@expo/vector-icons";
// Custom
import HeaderBackButton from "@/components/common/HeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import ShadowLine from "./ShadowLine";
import DrawerIconButton from "./DrawerIconButton";

interface Props {
    title: string;
}

const ThemedHeader = ({ title }: Props) => {
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
                <DrawerIconButton accentColor={accentColor} />
            </View>
            <ShadowLine width={"100%"} />
        </View>
    );
};

export default ThemedHeader;
