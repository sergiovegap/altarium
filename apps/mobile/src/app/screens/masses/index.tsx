// React
import React from "react";
import { Image, SectionList, Text } from "react-native";
// Expo

// Custom
import ThemedView from "@/components/common/ThemedView";
import MassCard from "./[id]";
import ShadowLine from "@/components/common/ShadowLine";
import AddMassButton from "@/components/ui/masses/AddMassButton";
import CustomButton from "@/components/common/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";

const DATA = [
    {
        date: "19-05-2023",
        data: [{ id: "1", time: "12:00", priest: "Sacerdote 1" }],
    },
    {
        date: "26-05-2023",
        data: [
            { id: "2", time: "12:00", priest: "Sacerdote 2" },
            { id: "3", time: "07:00", priest: "Sacerdote 3" },
        ],
    },
    {
        date: "03-06-2023",
        data: [{ id: "4", time: "12:00", priest: "Sacerdote 1" }],
    },
];

const Masses = () => {
    const { accentColor } = useThemeColor();

    return (
        <ThemedView>
            <CustomButton
                color={accentColor}
                className="self-end"
                iconSource={require("@/assets/icons/plus.png")}
                onPress={() => {}}
            />
            {/* <AddMassButton /> */}
            <SectionList
                sections={DATA}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section }) => (
                    <Text
                        style={{
                            fontWeight: "bold",
                            marginTop: 10,
                            fontSize: 18,
                        }}
                    >
                        {section.date}
                    </Text>
                )}
                renderItem={({ item }) => (
                    <MassCard
                        id={item.id}
                        timeStamp={item.time}
                        priest={item.priest}
                    />
                )}
                // SectionSeparatorComponent={<ShadowLine width={"100%"} />}
            />
        </ThemedView>
    );
};

export default Masses;
