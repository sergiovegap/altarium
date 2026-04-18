// React
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
// Third-party libraries
import { FlashList } from "@shopify/flash-list";
import { supabase } from "@/lib/supabase";
// Custom
import ThemedView from "@/components/common/ThemedView";
import ShadowLine from "@/components/common/ShadowLine";
import AltarBoyCard from "@/app/screens/altarboys/components/AltarBoyCard";
import { router, useLocalSearchParams } from "expo-router";

const DATA = [
    {
        id: "1",
        name: "Pablo Fernandez Perez",
        profilePhoto: require("@/assets/images/development/boy-1.png"),
        liturgical_items: ["Ambón", "Incensario", "Aspersorium"],
    },
    {
        id: "2",
        name: "Jorge Gutierrez Garcia",
        profilePhoto: require("@/assets/images/development/boy-2.png"),
        liturgical_items: ["Ambón", "Incensario", "Aspersorium"],
    },
    {
        id: "3",
        name: "Miguel Ojeda Hernandez",
        profilePhoto: require("@/assets/images/development/boy-3.png"),
        liturgical_items: ["Ambón", "Incensario", "Aspersorium"],
    },
];

const AltarBoys = () => {
    const { id } = useLocalSearchParams();
    const [altarBoys, setAltarBoys] = useState([]);

    useEffect(() => {
        // Acá hacés la query
        const fetchAltarBoys = async () => {
            const { data } = await supabase.from("profiles").select("*");
            setAltarBoys(data);
        };
        fetchAltarBoys();
    }, []);

    return (
        <ThemedView>
            <FlashList
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AltarBoyCard
                        name={item.name}
                        profilePhoto={item.profilePhoto}
                        onPress={() =>
                            router.push(
                                `/(drawer)/(tabs)/altarboys/[id]/${item.id}?name=${encodeURIComponent(item.name)}`,
                            )
                        }
                    />
                )}
                ItemSeparatorComponent={() => <ShadowLine />}
            />
        </ThemedView>
    );
};

export default AltarBoys;
