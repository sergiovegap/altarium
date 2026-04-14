import { DimensionValue, View } from "react-native";
import React from "react";

interface Props {
    width?: DimensionValue;
}

const ShadowLine = ({ width = "100%" }: Props) => {
    return (
        <View
            style={{
                width: width,
            }}
            className="h-[0.17px] bg-gray-400"
        />
    );
};

export default ShadowLine;
