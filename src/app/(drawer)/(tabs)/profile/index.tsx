// React
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { Text } from "react-native-gesture-handler";
// Expo
// Custom
import UserLiturgicalItemsList from "@/app/(drawer)/(tabs)/profile/liturgical-items";
import UserMassesList from "@/app/(drawer)/(tabs)/profile/user-masses-list";
import Avatar from "@/components/common/Avatar";
import ListItem from "@/components/common/ListItem";
import ShadowLine from "@/components/common/ShadowLine";
import ThemedView from "@/components/common/ThemedView";
import UserRole from "@/components/common/UserRole";
import { useProfile } from "@/features/auth/useProfile";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";

const Profile = () => {
  const { accentColor, accentColor_400, gold, gold_600, gold_50 } =
    useThemeColor();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { loadingProfile, profile, userRole } = useProfile();
  const [parishName, setParishName] = useState("");

  useEffect(() => {
    if (profile?.parish_id) {
      supabase
        .from("parishes")
        .select("name")
        .eq("id", profile.parish_id)
        .single()
        .then(({ data }) => {
          if (data) setParishName(data.name);
        });
    }
  }, [profile?.parish_id]);

  if (loadingProfile) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ThemedView className="bg-white pt-6">
      <View className="flex flex-col items-center">
        <Avatar
          userName={profile?.name + " " + profile?.last_name}
          imageSource={
            profile?.photo || require("@/assets/images/development/profile.png")
          }
        />
        <View className="mb-3 flex-row items-center">
          <Image
            source={require("@/assets/icons/church-location.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text>{parishName}</Text>
          <Text> </Text>
          <View className="h-[22px] w-[1px] bg-gray-500" />
          <Text> </Text>
          <UserRole
            userRole={userRole?.toString()}
            iconSource={require("@/assets/icons/altar-boy-cross-fill.png")}
          />
        </View>
      </View>
      <ShadowLine width={"100%"} />
      {loadingProfile ? (
        <ActivityIndicator />
      ) : userRole === "Monaguillo" ? (
        <>
          <View className="items-center">
            <SegmentedControl
              values={["Misas", "Objetos Litúrgicos"]}
              // selectedIndex={selectedIndex}
              selectedIndex={0}
              onChange={(event) => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              }}
              // tintColor={accentColor}
              // backgroundColor={accentColor_400}
              tintColor={gold_600}
              // backgroundColor={gold}
              activeFontStyle={{
                color: "white",
              }}
              style={{
                margin: 10,
                height: 40,
                width: "100%",
              }}
              fontStyle={{
                color: "black",
                fontWeight: "bold",
              }}
            />
          </View>
          <>
            {selectedIndex === 0 && <UserMassesList />}
            {selectedIndex === 1 && <UserLiturgicalItemsList item={ListItem} />}
          </>
        </>
      ) : (
        <UserMassesList />
      )}
    </ThemedView>
  );
};

export default Profile;
