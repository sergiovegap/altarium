// React
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Expo
import { Slot } from "expo-router";

const RootLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
        </GestureHandlerRootView>
    );
};

export default RootLayout;
