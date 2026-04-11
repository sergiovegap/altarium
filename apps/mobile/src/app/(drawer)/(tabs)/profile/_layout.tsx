import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
    return (
        <Stack
            initialRouteName="index"
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                animationDuration: 100,
                presentation: "card",
            }}
        >
            <Stack.Screen name="account/index" />
            <Stack.Screen name="settings/index" />
        </Stack>
    );
};

export default ProfileLayout;
