// React
import React from "react";
import { Pressable, Text, View } from "react-native";
import {
    DrawerActions,
    NavigationAction,
    NavigationProp,
} from "@react-navigation/native";
// Expo
import { useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
// Custom
import ThemedView from "@/components/common/ThemedView";

interface Props {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const Profile = ({ navigation }: Props) => {
    // const navigation = useNavigation();
    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer);
    };

    return (
        <View className="flex-1">
            <ThemedView>
                <View className="flex flex-row justify-between">
                    <Text className="color-purple-950">Perfil</Text>
                    <Pressable onPress={toggleDrawer}>
                        <FontAwesome name="gear" size={24} color="black" />
                    </Pressable>
                </View>
            </ThemedView>
        </View>
    );
};

export default Profile;
