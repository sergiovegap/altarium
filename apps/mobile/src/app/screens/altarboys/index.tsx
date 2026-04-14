// React
import React from "react";
import { FlatList, Text, View } from "react-native";
// Third-party libraries
import { FlashList } from "@shopify/flash-list";
// Custom
import ThemedView from "@/components/common/ThemedView";
import ShadowLine from "@/components/common/ShadowLine";
import AltarBoyCard from "@/components/ui/altarboys/AltarBoyCard";

const DATA = [
    {
        id: "1",
        name: "Pablo Fernandez Perez",
    },
    {
        id: "2",
        name: "Jorge Gutierrez Garcia",
    },
    {
        id: "3",
        name: "Miguel Ojeda Hernandez",
    },
];

const AltarBoys = () => {
    return (
        <ThemedView>
            <FlashList
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AltarBoyCard id={item.id} name={item.name} />
                )}
                ItemSeparatorComponent={() => <ShadowLine />}
            />
        </ThemedView>
    );
};

export default AltarBoys;
