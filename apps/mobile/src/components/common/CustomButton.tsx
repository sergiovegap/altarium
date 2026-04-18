// React
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    PressableProps,
    ViewProps,
} from "react-native";

interface Props extends ViewProps {
    color?: string;
    className?: string;
    iconSource?: ImageSourcePropType;
    onPress?: PressableProps["onPress"];
}

const CustomButton = ({ color, className, iconSource, onPress }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            className={`flex flex-row justify-between ${className}`}
        >
            <Image
                source={iconSource}
                style={{ width: 25, height: 25, tintColor: color }}
            />
        </Pressable>
    );
};

export default CustomButton;
