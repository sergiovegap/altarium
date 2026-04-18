import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import ThemedView from "@/components/common/ThemedView";
import MassCard from "@/app/screens/masses/components/MassCard";

const CalendarDay = () => {
    const { day } = useLocalSearchParams();
    const router = useRouter();
    const isEmpty: boolean = true;

    const masses = [
        { id: "1", time: "08:00", priest: "Sacerdote 1" },
        { id: "2", time: "12:00", priest: "Sacerdote 2" },
    ];

    return (
        <ThemedView className="m-2">
            <FlatList
                data={masses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() =>
                            router.push(
                                `/(drawer)/(tabs)/masses/[day]/${item.id}`,
                            )
                        }
                    >
                        <MassCard timeStamp={item.time} priest={item.priest} />
                    </Pressable>
                )}
            />
        </ThemedView>
    );
};

export default CalendarDay;
