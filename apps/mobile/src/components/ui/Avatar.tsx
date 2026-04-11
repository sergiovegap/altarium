// React
import React from "react";
import {
    View,
    Text,
    ImageSourcePropType,
    Image,
    ViewProps,
} from "react-native";
// Expo

interface Props extends ViewProps {
    userName: string;
    imageSource: ImageSourcePropType;
}

const Avatar = ({ userName, imageSource }: Props) => {
    return (
        <View
            style={{}}
            className="flex justify-center items-center rounded-xl mb-1"
        >
            <Image
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                }}
                source={imageSource}
            />
            <Text
                style={{
                    color: "black",
                    fontWeight: 500,
                }}
                className="text-2xl"
            >
                {userName}
            </Text>
        </View>
    );
};

export default Avatar;
