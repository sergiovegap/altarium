// React
import React from "react";
// Expo
import { Drawer } from "expo-router/drawer";
// Custom
import CustomDrawer from "@/components/ui/CustomDrawer";

const ProfileDrawerLayout = () => {
    return (
        <Drawer
            drawerContent={CustomDrawer}
            screenOptions={{
                drawerPosition: "right",
                headerShown: false,
                swipeEnabled: true,
                drawerType: "front",
                overlayColor: "rgba(0, 0, 0, 0.4)",
                sceneStyle: {
                    backgroundColor: "white",
                },
                drawerStyle: {
                    width: "80%",
                    backgroundColor: "white",
                    padding: 10,
                },
            }}
        ></Drawer>
    );
};

export default ProfileDrawerLayout;
