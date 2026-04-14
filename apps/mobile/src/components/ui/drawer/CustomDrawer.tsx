// React
import React from "react";
import { View } from "react-native";
// Expo
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import CustomDrawerItems from "@/components/ui/drawer/CustomDrawerItem";
import { useThemeColor } from "@/hooks/useThemeColor";
import Avatar from "../../common/Avatar";

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const { accentColor, accentColor_400, gold, gold_600 } = useThemeColor();

    return (
        <DrawerContentScrollView {...props}>
            <View className="flex items-center">
                <Avatar
                    userName="John Doe"
                    imageSource={require("@/assets/images/development/profile.png")}
                />
                <CustomDrawerItems
                    label="Ajustes"
                    baseColor={accentColor}
                    accentColor={accentColor_400}
                    route="/profile/settings"
                    iconSource={require("@/assets/icons/gear.png")}
                />
                <CustomDrawerItems
                    label="Privacidad"
                    baseColor={accentColor}
                    accentColor={accentColor_400}
                    route="/profile/privacy"
                    iconSource={require("@/assets/icons/user-secret.png")}
                />
                <CustomDrawerItems
                    label="Cuenta"
                    baseColor={accentColor}
                    accentColor={accentColor_400}
                    route="/profile/account"
                    iconSource={require("@/assets/icons/key.png")}
                />
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;
