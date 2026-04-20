// React
import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
// Custom
import ThemedView from "@/components/common/ThemedView";
import MassCard from "@/components/screens/masses/MassCard";
import NoMasses from "@/components/screens/masses/NoMasses";
import { router } from "expo-router";

interface Props {
    item: typeof MassCard;
}

const DATA = [
    {
        date: "19-05-2023",
        data: {
            id: "1",
            time: "08:00 am",
            priest: "Sacerdote 1",
            ministers: ["Ministro 1", "Ministro 2"],
            altarBoys: ["Monaguillo 1", "Monaguillo 2"],
        },
    },
    {
        date: "26-05-2023",
        data: {
            id: "2",
            time: "12:00 pm",
            priest: "Sacerdote 2",
            ministers: ["Ministro 1", "Ministro 2"],
            altarBoys: ["Monaguillo 1", "Monaguillo 2"],
        },
    },
    {
        date: "26-05-2023",
        data: {
            id: "3",
            time: "01:00 pm",
            priest: "Sacerdote 3",
            ministers: ["Ministro 1", "Ministro 2"],
            altarBoys: ["Monaguillo 1", "Monaguillo 2"],
        },
    },
    {
        date: "03-06-2023",
        data: {
            id: "4",
            time: "08:00 pm",
            priest: "Sacerdote 1",
            ministers: ["Ministro 1", "Ministro 2"],
            altarBoys: ["Monaguillo 1", "Monaguillo 2"],
        },
    },
];

const UserMassesList = () => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.data.id}
                renderItem={({ item }) =>
                    item ? (
                        <Pressable
                            onPress={() =>
                                router.push(
                                    `/(drawer)/(tabs)/masses/[day]/${item.data.id}?time=${item.data.time}&priest=${item.data.priest}&ministers=${encodeURIComponent(JSON.stringify(item.data.ministers))}&altarBoys=${encodeURIComponent(JSON.stringify(item.data.altarBoys))}`,
                                )
                            }
                        >
                            <MassCard
                                timeStamp={item.data.time}
                                priest={item.data.priest}
                            />
                        </Pressable>
                    ) : (
                        <NoMasses />
                    )
                }
            />
        </View>
    );
};

export default UserMassesList;
