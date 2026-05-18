// React
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { Text } from "react-native-gesture-handler";
// Custom
import UserLiturgicalItemsList from "@/app/(app)/(tabs)/profile/liturgical-items";
import UserMassesList from "@/app/(app)/(tabs)/profile/user-masses-list";
import Avatar from "@/components/common/Avatar";
import ShadowLine from "@/components/common/ShadowLine";
import ThemedView from "@/components/common/ThemedView";
import UserRole from "@/components/common/UserRole";
import { useProfile } from "@/hooks/useProfile";
import { useThemeColor } from "@/hooks/useThemeColor";

const Profile = () => {
  const { gold_600 } = useThemeColor();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { loadingProfile, profile, userRole, parishName } = useProfile();

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
          imageSource={profile?.photo ? { uri: profile.photo } : undefined}
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
              values={["Mis Misas", "Mis Objetos Litúrgicos"]}
              selectedIndex={selectedIndex}
              onChange={(event) => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              }}
              tintColor={gold_600}
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
            {selectedIndex === 1 && <UserLiturgicalItemsList />}
          </>
        </>
      ) : (
        <UserMassesList />
      )}
    </ThemedView>
  );
};

export default Profile;
