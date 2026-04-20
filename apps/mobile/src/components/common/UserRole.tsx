// React
import React from "react";
import {
    View,
    Text,
    ImageSourcePropType,
    Image,
    ViewProps,
} from "react-native";

interface Props extends ViewProps {
    userRole?: string;
    iconSource?: ImageSourcePropType;
}

const UserRole = ({ userRole, iconSource }: Props) => {
    return (
        <View className="flex-row items-center">
            <Image source={iconSource} style={{ width: 24, height: 24 }} />
            <Text>{userRole}</Text>
        </View>
    );
};

export default UserRole;
