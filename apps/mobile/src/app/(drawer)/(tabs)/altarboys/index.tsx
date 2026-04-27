// React
import React, { useState } from "react";
import { FlatList } from "react-native";
// Third-party libraries
import { FlashList } from "@shopify/flash-list";
// import { supabase } from "@/lib/supabase";
// Expo
import { router, useLocalSearchParams } from "expo-router";
// Custom
import ThemedView from "@/components/common/ThemedView";
import ShadowLine from "@/components/common/ShadowLine";
import AltarBoyCard from "@/components/screens/altarboys/AltarBoyCard";
import AltarBoysMock from "@altarium/packages/core/utils/altarboys-profiles-mock";

const AltarBoys = () => {
    const { id } = useLocalSearchParams();
    const [altarBoys, setAltarBoys] = useState([]);

    // useEffect(() => {
    //     // Acá hacés la query
    //     const fetchAltarBoys = async () => {
    //         const { data, error } = await supabase.from("profiles").select("*");
    //         setAltarBoys(data);
    //     };
    //     fetchAltarBoys();
    // }, []);

    return (
        <ThemedView>
            <FlashList
                data={AltarBoysMock}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AltarBoyCard
                        name={item.name}
                        profilePhoto={item.profilePhoto}
                        onPress={() =>
                            router.push(
                                `/(drawer)/(tabs)/altarboys/[id]/${item.id}?name=${encodeURIComponent(item.name)}&profilePhoto=${item.profilePhoto}&liturgical_items=${encodeURIComponent(JSON.stringify(item.liturgical_items))}`,
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
