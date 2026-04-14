// React
import React, { useState } from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
// Expo
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedView from "@/components/common/ThemedView";
import Avatar from "@/components/common/Avatar";
import UserRole from "@/components/common/UserRole";
import ShadowLine from "@/components/common/ShadowLine";
import UserMassesList from "@/components/ui/masses/UserMassesList";
import UserLiturgicalItemsList from "@/components/ui/liturgical-items/UserLiturgicalItemsList";
import LiturgicalItemCard from "@/components/ui/liturgical-items/LiturgicalItemCard";

interface Props {
    userRole?: string;
    parish?: string;
}

const Profile = ({
    userRole = "Monaguillo",
    parish = "Parroquia Virgen de San Juan",
}: Props) => {
    const { accentColor, accentColor_400, gold, gold_600, gold_50 } =
        useThemeColor();
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <ThemedView className="flex flex-col items-center bg-white pt-6">
            <Avatar
                className=""
                userName="Sergio Vega Perera"
                imageSource={require("@/assets/images/development/profile.png")}
            />
            <View className="flex-row items-center mb-3">
                <Image
                    source={require("@/assets/icons/church-location.png")}
                    style={{ width: 24, height: 24 }}
                />
                <Text>{parish}</Text>
                <Text> </Text>
                <View className="h-[22px] w-[1px] bg-gray-500" />
                <Text> </Text>
                <UserRole
                    userRole={userRole}
                    iconSource={require("@/assets/icons/altar-boy-cross-fill.png")}
                />
            </View>
            <ShadowLine width={"100%"} />
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
                fontStyle={{ color: "black", fontWeight: "bold" }}
            />
            <View style={{ flex: 1 }}>
                {selectedIndex === 0 && <UserMassesList></UserMassesList>}
                {selectedIndex === 1 && (
                    <UserLiturgicalItemsList item={LiturgicalItemCard} />
                )}
            </View>
        </ThemedView>
    );
};

export default Profile;
