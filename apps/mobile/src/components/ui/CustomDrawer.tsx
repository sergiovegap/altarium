// React
import React from "react";
import { Text, View } from "react-native";
// Expo
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View className="flex justify-center items-center mx-3 p-10 mb-10 has-[150px]: rounded-xl bg-slate-500">
                <View className="flex justify-center items-center bg-white rounded-full h-24 w-24">
                    <Text className="text-primary font-work-black text-3xl">
                        SV
                    </Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;
