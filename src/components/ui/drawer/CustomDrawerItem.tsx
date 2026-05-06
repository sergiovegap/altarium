// React
import React from "react";
import {
    View,
    Text,
    Pressable,
    Image,
    ImageSourcePropType,
} from "react-native";
// Expo
import { Href, usePathname, Link } from "expo-router";

interface Props {
    label: string;
    baseColor: string;
    accentColor: string;
    route: Href;
    iconSource: ImageSourcePropType;
}

const CustomDrawerItems = ({
    label,
    baseColor,
    accentColor,
    route,
    iconSource,
}: Props) => {
    // const { accentColor, accentColor_400, gold, gold_600 } = useThemeColor();
    const pathname = usePathname();
    const isFocused = pathname === route;

    return (
        <Link
            href={route}
            asChild
            className="rounded-[10px] bg-white border-[1px] border-gray-400 p-2 m-2 w-full"
            style={{
                borderColor: baseColor,
                backgroundColor: isFocused ? accentColor : "white",
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
                                backgroundColor: isFocused
                                    ? accentColor
                                    : "white",
                                tintColor: baseColor,
                                width: 26,
                                height: 26,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            color: baseColor,
                            fontWeight: isFocused ? "600" : "400",
                        }}
                    >
                        {label}
                    </Text>
                </View>
                <Image
                    source={require("@/assets/icons/arrow-right.png")}
                    style={{
                        tintColor: baseColor,
                        width: 24,
                        height: 24,
                    }}
                />
            </Pressable>
        </Link>
    );
};

export default CustomDrawerItems;
