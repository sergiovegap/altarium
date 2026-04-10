// React
import { Image, Pressable } from "react-native";
// Expo
import { router } from "expo-router";

const HeaderBackButton = () => {
    return (
        <Pressable onPress={() => router.dismissTo("/(drawer)/(tabs)/profile")}>
            <Image
                source={require("@/assets/icons/arrow-left.png")}
                style={{ width: 20, height: 20 }}
            />
        </Pressable>
    );
};

export default HeaderBackButton;
