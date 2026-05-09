// React
import { View } from "react-native";
// Expo
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
// Custom
import Avatar from "@/components/common/Avatar";
import CustomButtonLabel from "@/components/common/CustomButtonLabel";
import CustomDrawerItems from "@/components/ui/drawer/CustomDrawerItem";
import { useProfile } from "@/hooks/useProfile";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { accentColor, gray_400, gray_600 } = useThemeColor();
  const { profile } = useProfile();

  const onPress = async () => {
    const { error } = await supabase.auth.signOut();

    router.replace("/auth/login");

    if (error) throw error;
  };

  return (
    <View className="flex-1" style={{}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 items-center justify-between">
          <View>
            <Avatar
              userName={profile?.name + " " + profile?.last_name}
              imageSource={profile?.photo ? { uri: profile.photo } : undefined}
              className="mb-4"
            />
            <CustomDrawerItems
              label="Ajustes"
              baseColor={gray_400}
              accentColor={gray_600}
              route="/profile/settings"
              iconSource={require("@/assets/icons/gear.png")}
            />

            <CustomDrawerItems
              label="Privacidad"
              baseColor={gray_400}
              accentColor={gray_600}
              route="/profile/privacy"
              iconSource={require("@/assets/icons/user-secret.png")}
            />

            <CustomDrawerItems
              label="Cuenta"
              baseColor={gray_400}
              accentColor={gray_600}
              route="/profile/account"
              iconSource={require("@/assets/icons/key.png")}
            />
          </View>

          <CustomButtonLabel
            title="Cerrar Sesión"
            textColor={accentColor}
            color={accentColor}
            onPress={onPress}
            iconSource={require("@/assets/icons/door-arrow-right.png")}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
