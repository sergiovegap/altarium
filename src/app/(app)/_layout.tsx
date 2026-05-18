// React
// Expo
import { Drawer } from "expo-router/drawer";
// Custom
import CustomDrawer from "@/components/ui/drawer/CustomDrawer";

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
          backgroundColor: "#f8f9fa",
        },
        drawerStyle: {
          width: "90%",
          backgroundColor: "#f8f9fa",
          padding: 10,
        },
      }}
    ></Drawer>
  );
};

export default ProfileDrawerLayout;
