import { DimensionValue, FlexStyle, View } from "react-native";
import React from "react";

interface Props extends FlexStyle {
    width: DimensionValue;
}

const ShadowLine = ({ width }: Props) => {
    return (
        <View
            style={{
                width: width,
            }}
            className="h-[0.2px] bg-gray-400"
        />
    );
};

export default ShadowLine;
