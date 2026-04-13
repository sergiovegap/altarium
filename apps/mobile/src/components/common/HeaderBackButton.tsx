// React
import { Image, Pressable } from "react-native";
// Expo
import { Href, router } from "expo-router";

interface Props {
    color: string;
    href: Href;
}

const HeaderBackButton = ({ color, href }: Props) => {
    return (
        <Pressable onPress={() => router.dismissTo(href)}>
            <Image
                source={require("@/assets/icons/arrow-left.png")}
                style={{ width: 24, height: 24, tintColor: color }}
            />
        </Pressable>
    );
};

export default HeaderBackButton;
