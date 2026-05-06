import { View, Text, Image } from "react-native";
import React from "react";
import ThemedView from "@/components/common/ThemedView";

interface Props {
    timeStamp?: string;
    priest?: string;
}

const MassCard = ({ timeStamp, priest }: Props) => {
    return (
        <ThemedView className="flex-row content-center border border-gray-300 bg-gray-100 rounded-lg mt-1 mb-3">
            <Image
                source={require("@/assets/icons/eucaristia.png")}
                //  source={require("@/assets/icons/communion-fill.png")}
                style={{ width: 26, height: 40 }}
            />
            <View className="flex-col justify-center ml-5">
                <Text className="font-bold">{timeStamp}</Text>
                <Text className="text-sm">{priest}</Text>
            </View>
        </ThemedView>
    );
};

export default MassCard;
