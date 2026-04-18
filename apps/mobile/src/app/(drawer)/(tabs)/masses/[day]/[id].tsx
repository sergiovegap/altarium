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
    const { id, name } = useLocalSearchParams();

    return (
        <ThemedView className="m-5 gap-10">
            <View className="">
                <Text className="font-bold">Hora:</Text>
                {/* <Text className="font-bold">{timeStamp}</Text> */}
            </View>
            <View className="">
                <Text className="font-bold">Sacerdote:</Text>
                <Text className="">{priest}</Text>
            </View>
            <View className="">
                <Text className="font-bold">Ministros Extraordinarios:</Text>
            </View>
            <View className="">
                <Text className="font-bold">Monaguillos:</Text>
            </View>
        </ThemedView>
    );
};

export default MassByID;
