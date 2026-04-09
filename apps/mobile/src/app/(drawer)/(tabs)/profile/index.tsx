// React
import React from "react";
// Custom
import Profile from "@/app/screens/profile";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    return <Profile navigation={useNavigation()} />;
};

export default ProfileScreen;
