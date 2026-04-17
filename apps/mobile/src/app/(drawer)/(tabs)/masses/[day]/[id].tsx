// React
import React from "react";
import { View, Text, Image } from "react-native";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";

interface Props {
    timeStamp?: string;
    priest?: string;
}

const MassByID = ({ timeStamp, priest }: Props) => {
    const { accentColor, gold, accentColor_400 } = useThemeColor();
    const { id } = useLocalSearchParams();

    return (
        <ThemedView className="">
            <View className="flex-col ml-5">
                <Text>Detalle de la misa {id}</Text>
                <Text className="font-bold">{timeStamp}</Text>
                <Text className="text-sm">{priest}</Text>
                <Text className="text-sm">Ministros</Text>
                <Text className="text-sm">Monaguillos</Text>
            </View>
        </ThemedView>
    );
};

export default MassByID;
