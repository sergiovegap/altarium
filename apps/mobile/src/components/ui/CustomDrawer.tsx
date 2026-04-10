// React
import React from "react";
import { Image, Text, View } from "react-native";
// Expo
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import CustomDrawerItems from "./CustomDrawerItem";
import { useThemeColor } from "@/hooks/useThemeColor";

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const { accentColor, gold, gold_600 } = useThemeColor();

    return (
        <DrawerContentScrollView {...props}>
            <View className="flex items-center">
                <View
                    style={{
                        borderColor: gold_600,
                        borderWidth: 1,
                        borderRadius: 10,
                    }}
                    className="flex justify-center items-center mx p-5 mb-5 rounded-xl w-full"
                >
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                        }}
                        source={require("@/assets/images/development/profile.png")}
                    />
                    <Text
                        style={{
                            color: "black",
                            fontSize: 20,
                            fontWeight: "bold",
                        }}
                        className="mt-2"
                    >
                        Username
                    </Text>
                </View>
                <CustomDrawerItems
                    label="Ajustes"
                    color={gold_600}
                    route="/screens/settings"
                    iconSource={require("@/assets/icons/gear.png")}
                />
                <CustomDrawerItems
                    label="Privacidad"
                    color={gold_600}
                    route="/screens/privacy"
                    iconSource={require("@/assets/icons/user-secret.png")}
                />
                <CustomDrawerItems
                    label="Cuenta"
                    color={gold_600}
                    route="/screens/account"
                    iconSource={require("@/assets/icons/key.png")}
                />
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;
