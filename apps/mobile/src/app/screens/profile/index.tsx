// React
import React from "react";
// Expo
// Custom
import ThemedView from "@/components/common/ThemedView";
import Avatar from "@/components/ui/Avatar";
import UserRole from "@/components/common/UserRole";
import { Text } from "react-native-gesture-handler";
import { Image, View } from "react-native";
import ShadowLine from "@/components/common/ShadowLine";
import AltarBoyItems from "@/components/common/AltarBoyItems";

interface Props {
    userRole: string;
    parroquia: string;
}

const Profile = ({
    userRole = "Monaguillo",
    parroquia = "Parroquia Virgen de San Juan",
}: Props) => {
    return (
        <ThemedView className="flex flex-col items-center bg-white">
            <Avatar
                className=""
                userName="Sergio Vega Perera"
                imageSource={require("@/assets/images/development/profile.png")}
            ></Avatar>
            <View className="flex-row items-center mb-3">
                <Image
                    source={require("@/assets/icons/church-location.png")}
                    style={{ width: 24, height: 24 }}
                />
                <Text>{parroquia}</Text>
                <Text> </Text>
                <View className="h-[22px] w-[1px] bg-gray-500" />
                <Text> </Text>
                <UserRole
                    userRole={userRole}
                    iconSource={require("@/assets/icons/altar-boy-cross-fill.png")}
                />
            </View>
            <ShadowLine width={"100%"} />
            <View>
                <AltarBoyItems />
            </View>
        </ThemedView>
    );
};

export default Profile;
