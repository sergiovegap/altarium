import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
    name: string;
    description: string;
    accentColor: string;
}

const DATA = [
    { id: "1", name: "Ambón", description: "Ambón" },
    {
        id: "2",
        name: "Aspersorium (acetre) y Aspergillum (aspersorio)",
        description: "Aspersorium (acetre) y Aspergillum (aspersorio)",
    },
    { id: "3", name: "Atril y Misal", description: "Atril y Misal" },
    {
        id: "4",
        name: "Cáliz, Purificador y Palia",
        description: "Cáliz, Purificador y Palia",
    },
];

const Item = ({ name, description, accentColor }: Props) => (
    <View
        className="flex flex-col items-center justify-end"
        style={{
            width: 125,
            height: 125,
            margin: 10,
            padding: 8,
            borderWidth: 1,
            borderColor: accentColor,
            borderRadius: 10,
            backgroundColor: "white",
        }}
    >
        <Image
            source={require("@/assets/icons/altar-boy-cross-fill.png")}
            style={{ width: 90, height: 90 }}
        />
        <Text className="font-bold" numberOfLines={2}>
            {name}
        </Text>
        {/* <Text className="flex-row flex-shrink text-gray-500" numberOfLines={2}>
            {description}
        </Text> */}
    </View>
);

const AltarBoyItems = () => {
    const { accentColor } = useThemeColor();

    return (
        <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
                <Item
                    name={item.name}
                    description={item.description}
                    accentColor={accentColor}
                />
            )}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{
                padding: 8,
                margin: 10,
            }}
        />
    );
};

export default AltarBoyItems;
