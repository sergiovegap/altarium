import { Image } from "react-native";
import React from "react";
import ButtonLabel from "@/components/common/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";

const AddMassButton = () => {
    const { accentColor } = useThemeColor();

    return (
        <ButtonLabel
            iconSource={require("@/assets/icons/plus.png")}
            onPress={() => {}}
        />
    );
};

export default AddMassButton;
