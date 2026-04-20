import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    Pressable,
    ViewProps,
} from "react-native";
import React from "react";
import ThemedView from "@/components/common/ThemedView";
import { useLocalSearchParams } from "expo-router";

interface Props extends ViewProps {
    name: string;
    profilePhoto?: ImageSourcePropType;
    onPress?: () => void;
}

const AltarBoyCard = ({ name, profilePhoto, onPress }: Props) => {
    return (
        <Pressable onPress={onPress}>
            <ThemedView className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Image
                        source={profilePhoto}
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
