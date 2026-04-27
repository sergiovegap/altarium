// React
import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
// Expo
import { useLocalSearchParams } from "expo-router";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedView from "@/components/common/ThemedView";
import Avatar from "@/components/common/Avatar";
import UserRole from "@/components/common/UserRole";
import ShadowLine from "@/components/common/ShadowLine";
import UserMassesList from "@/app/(drawer)/(tabs)/profile/user-masses-list";
import UserLiturgicalItemsList from "@/app/(drawer)/(tabs)/profile/liturgical-items";
import LiturgicalItemCard from "@/components/screens/liturgical-items/LiturgicalItemCard";
import { useSession } from "@/features/auth/useSession";
import { useProfile } from "@/features/auth/useProfile";
import ListItem from "@/components/common/ListItem";

interface Props {
    userRole?: string;
    parish?: string;
}

const Profile = () =>
    // {
    //     // userRole = "Monaguillo",
    //     // parish = "Parroquia Virgen de San Juan",
    // }: Props,
    {
        const { accentColor, accentColor_400, gold, gold_600, gold_50 } =
            useThemeColor();
        const [selectedIndex, setSelectedIndex] = useState(0);
        const { id } = useLocalSearchParams();
        const {
            loadingProfile,
            profile,
            userRole = "Monaguillo",
        } = useProfile();

        return (
            <ThemedView className="bg-white pt-6">
                <View className="flex flex-col items-center">
                    <Avatar
                        userName="Sergio Vega Perera"
                        imageSource={require("@/assets/images/development/profile.png")}
                    />
                    <View className="flex-row items-center mb-3">
                        <Image
                            source={require("@/assets/icons/church-location.png")}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text>
                            {profile?.parish_id ||
                                "Parroquia Virgen de San Juan"}
                        </Text>
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
                                    setSelectedIndex(
                                        event.nativeEvent.selectedSegmentIndex,
                                    );
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
                            {selectedIndex === 1 && (
                                <UserLiturgicalItemsList item={ListItem} />
                            )}
                        </>
                    </>
                ) : (
                    <UserMassesList />
                )}
            </ThemedView>
        );
    };

export default Profile;
