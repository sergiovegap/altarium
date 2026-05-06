import React from "react";
import { Pressable, Image } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

interface Props {
    accentColor: string;
}

const DrawerIconButton = ({ accentColor }: Props) => {
    const navigation = useNavigation();
    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer);
    };

    return (
        <Pressable onPress={toggleDrawer}>
            <Image
                source={require("@/assets/icons/list-rounded.png")}
                style={{ width: 25, height: 25, tintColor: accentColor }}
            />
        </Pressable>
    );
};

export default DrawerIconButton;
