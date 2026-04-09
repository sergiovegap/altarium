// React
import { useThemeColor } from "@/hooks/useThemeColor";
import { GlyphMap, Icon } from "@expo/vector-icons/build/createIconSet";
import React from "react";
import { Image, Pressable, PressableProps, Text, View } from "react-native";

interface Props extends PressableProps {
    title?: string;
    glyphMap: React.ReactNode;
}

const ButtonLabel = ({ title, glyphMap, onPress }: Props) => {
    const { accentColor } = useThemeColor();

    return (
        <Pressable onPress={onPress} className="flex flex-row justify-between">
            {glyphMap}
            <Text className="text-primary text-xl">{title}</Text>
        </Pressable>
    );
};

export default ButtonLabel;
