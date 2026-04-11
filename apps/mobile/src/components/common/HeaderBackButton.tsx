// React
import { Image, Pressable } from "react-native";
// Expo
import { router } from "expo-router";

interface Props {
    color: string;
}

const HeaderBackButton = ({ color }: Props) => {
    return (
        <Pressable onPress={() => router.dismissTo("/(drawer)/(tabs)/profile")}>
            <Image
                source={require("@/assets/icons/arrow-left.png")}
                style={{ width: 24, height: 24, tintColor: color }}
            />
        </Pressable>
    );
};

export default HeaderBackButton;
