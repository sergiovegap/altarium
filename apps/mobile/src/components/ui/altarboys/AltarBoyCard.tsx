import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    Pressable,
} from "react-native";
import React from "react";
import ThemedView from "@/components/common/ThemedView";

interface Props {
    id: string;
    name: string;
    profilePhoto?: ImageSourcePropType;
}

const AltarBoyCard = ({ id, name, profilePhoto }: Props) => {
    return (
        <Pressable>
            <ThemedView className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Image
                        source={require("@/assets/images/profile.png")}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 100,
                            marginRight: 10,
                        }}
                    />
                    <Text className="font-bold text-gray-700">{name}</Text>
                </View>
                <Image
                    source={require("@/assets/icons/arrow-right.png")}
                    style={{ width: 18, height: 18, tintColor: "gray" }}
                    className=""
                />
            </ThemedView>
        </Pressable>
    );
};

export default AltarBoyCard;
