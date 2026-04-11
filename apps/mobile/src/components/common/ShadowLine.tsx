import { DimensionValue, View } from "react-native";
import React from "react";

interface Props {
    width: DimensionValue;
}

const ShadowLine = ({ width }: Props) => {
    return (
        <View
            style={{
                width: width,
            }}
            className="h-[0.5px] w-full bg-gray-400"
        />
    );
};

export default ShadowLine;
