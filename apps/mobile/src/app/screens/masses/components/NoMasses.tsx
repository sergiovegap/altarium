import { View, Text } from "react-native";
import React from "react";
import ThemedView from "@/components/common/ThemedView";

const NoMasses = () => {
    return (
        <ThemedView>
            <Text className="text-3xl font-bold">No hay Misas disponibles</Text>
        </ThemedView>
    );
};

export default NoMasses;
