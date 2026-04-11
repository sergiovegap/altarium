// React
import React from "react";
import { Pressable, Text, View } from "react-native";
// Custom
import HeaderBackButton from "@/components/common/HeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import ShadowLine from "./ShadowLine";

interface Props {
    title: string;
}

const ThemedHeader = ({ title }: Props) => {
    const { accentColor } = useThemeColor();
    const navigation = useNavigation();
    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer);
    };

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
                <Pressable onPress={toggleDrawer}>
                    <FontAwesome name="gear" size={24} color={accentColor} />
                </Pressable>
            </View>
            <ShadowLine width={"100%"} />
        </View>
    );
};

export default ThemedHeader;
