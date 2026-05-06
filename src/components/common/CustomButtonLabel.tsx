// React
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    PressableProps,
    Text,
    ViewProps,
} from "react-native";

interface Props extends ViewProps {
    title?: string;
    color?: string;
    className?: string;
    iconSource?: ImageSourcePropType;
    onPress?: PressableProps["onPress"];
}

const CustomButtonRouter = ({
    title,
    color,
    className,
    iconSource,
    onPress,
}: Props) => {
    return (
        <Pressable
            onPress={onPress}
            className={`flex flex-row justify-between ${className}`}
        >
            <Image
                source={iconSource}
                style={{ width: 25, height: 25, tintColor: color }}
            />
            <Text className="text-primary text-xl">{title}</Text>
        </Pressable>
    );
};

export default CustomButtonRouter;
