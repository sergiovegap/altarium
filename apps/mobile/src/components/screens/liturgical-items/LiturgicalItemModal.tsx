// React
import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

interface Props {
    name: string;
    description: string;
    imageSource?: ImageSourcePropType;
}

const LiturgicalItemModal = ({ name, description, imageSource }: Props) => {
    return (
        <View className="flex-col items-center">
            <Image
                source={imageSource}
                style={{
                    width: 100,
                    height: 100,
                    margin: 12,
                    borderRadius: 10,
                }}
            />
            <Text className="font-bold m-1">{name}</Text>
            <Text>{description}</Text>
        </View>
    );
};

export default LiturgicalItemModal;
