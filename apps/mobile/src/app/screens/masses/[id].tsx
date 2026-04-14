// React
import React from "react";
import { View, Text, Image } from "react-native";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
    id: string;
    timeStamp: string;
    priest: string;
}

const MassCard = ({ id, timeStamp, priest }: Props) => {
    const { accentColor, gold, accentColor_400 } = useThemeColor();

    return (
        <ThemedView className="flex-row items-center border border-gray-300 bg-gray-100 rounded-lg m-2">
            <Image
                source={require("@/assets/icons/eucaristia.png")}
                //  source={require("@/assets/icons/communion-fill.png")}
                style={{ width: 26, height: 40 }}
            />
            <View className="flex-col ml-5">
                <Text className="font-bold">{timeStamp}</Text>
                <Text className="text-sm">{priest}</Text>
            </View>
        </ThemedView>
    );
};

export default MassCard;
