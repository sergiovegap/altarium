import {
    View,
    Text,
    Pressable,
    Image,
    ImageSourcePropType,
} from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Href, usePathname, Link } from "expo-router";

interface Props {
    label: string;
    color: string;
    route: Href;
    iconSource: ImageSourcePropType;
}

const CustomDrawerItems = ({ label, color, route, iconSource }: Props) => {
    const { accentColor, gold, gold_600 } = useThemeColor();
    const pathname = usePathname();
    const isFocused = pathname === route;

    return (
        <Link
            href={route}
            asChild
            className="rounded-[10px] bg-white border-[1px] border-gray-400 p-2 m-2 w-full"
            style={{
                borderColor: gold_600,
            }}
        >
            <Pressable className="flex-row justify-between items-center">
                <View className="p-1 flex-row items-center">
                    <View
                        style={{
                            marginRight: 12,
                        }}
                    >
                        <Image
                            source={iconSource}
                            style={{
                                tintColor: isFocused ? accentColor : color,
                                width: 26,
                                height: 26,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            color: isFocused ? accentColor : color,
                            fontWeight: isFocused ? "600" : "400",
                        }}
                    >
                        {label}
                    </Text>
                </View>
                <Image
                    source={require("@/assets/icons/arrow-right.png")}
                    style={{ tintColor: color, width: 24, height: 24 }}
                />
            </Pressable>
        </Link>
    );
};

export default CustomDrawerItems;
