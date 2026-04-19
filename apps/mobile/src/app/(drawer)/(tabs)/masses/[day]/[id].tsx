// React
import React from "react";
import { View, Text, Image, FlatList } from "react-native";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";

interface Props {
    timeStamp?: string;
    priest?: string;
}

const MassByID = ({ timeStamp }: Props) => {
    const { accentColor, gold, accentColor_400 } = useThemeColor();
    const { id, time, priest, ministers, altarBoys } = useLocalSearchParams();

    const ministersList = ministers ? (ministers as string).split(",") : [];
    const altarBoysList = altarBoys
        ? (altarBoys as string).split(",").filter((m) => m.trim())
        : [];

    return (
        <ThemedView className="m-5 gap-5">
            <View className="">
                <Text className="font-bold">Hora:</Text>
                <Text className="">{time}</Text>
            </View>
            <View className="">
                <Text className="font-bold">Sacerdote:</Text>
                <Text className="">{priest}</Text>
            </View>
            <View className="">
                <Text className="font-bold">Ministros Extraordinarios:</Text>
                {ministersList.length > 0 ? (
                    ministersList.map((minister, index) => (
                        <Text key={index}>{minister}</Text>
                    ))
                ) : (
                    <Text>Sin ministros asignados</Text>
                )}
            </View>
            <View className="">
                <Text className="font-bold">Monaguillos:</Text>
                {altarBoysList.length > 0 ? (
                    altarBoysList.map((altarBoy, index) => (
                        <Text key={index}>{altarBoy}</Text>
                    ))
                ) : (
                    <Text>Sin monaguillos asignados</Text>
                )}
            </View>
        </ThemedView>
    );
};

export default MassByID;
