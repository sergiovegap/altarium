// React
import React from "react";
import {
    View,
    Text,
    Pressable,
    Image,
    ImageSourcePropType,
} from "react-native";
// Expo
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
    name: string;
    description: string;
    source: ImageSourcePropType;
    onPress: () => void;
}

const MassItemCard = ({ name, description, source, onPress }: Props) => {
    const { accentColor, gold, gold_50, gold_100, gold_600 } = useThemeColor();

    return (
        <Pressable
            onPress={onPress}
            className="flex flex-col items-center justify-end"
            style={{
                width: 100,
                height: 100,
                margin: 10,
                padding: 8,
                borderWidth: 1,
                borderColor: gold_600,
                borderRadius: 10,
                backgroundColor: gold_50,
            }}
        >
            <Image
                source={require("@/assets/icons/altar-boy-cross-fill.png")}
                style={{ width: 60, height: 60 }}
            />
            <Text className="font-bold text-sm">{name}</Text>
        </Pressable>
    );
};

export default MassItemCard;
