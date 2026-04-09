import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";

const HeaderBackButton = () => (
    <Pressable onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={20} color="black" />
    </Pressable>
);

export default HeaderBackButton;
