// React
import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

interface Props {
    name: string;
    description: string;
    source: ImageSourcePropType;
}

const MassItemModal = ({ name, description, source }: Props) => {
    return (
        <View className="flex-col items-center">
            <Image
                source={source}
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

export default MassItemModal;
