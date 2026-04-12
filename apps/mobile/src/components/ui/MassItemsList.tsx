// Ract
import React, { useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, View } from "react-native";
// Expo
import { Href, usePathname, Link } from "expo-router";
import { router } from "expo-router";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";
import MassItemCard from "@/components/ui/MassItemCard";
import MassItemModal from "./MassItemModal";

interface Props {
    item: typeof MassItemCard;
}

const DATA = [
    {
        id: "1",
        name: "Ambón",
        description:
            "Plataforma elevada situada en el presbiterio de las iglesias, utilizado en la liturgia católica y ortodoxa para la proclamación de la Palabra de Dios.",
    },
    {
        id: "2",
        name: "Aspersorium",
        description:
            "La cubeta que se usa para llevar agua bendita para rociar y el hisopo para rociar agua bendita",
    },
    {
        id: "3",
        name: "Misal",
        description:
            "El Atril es un soporte inclinado, situado en el altar o la credencia, destinado a sostener el Misal Romano",
    },
    {
        id: "4",
        name: "Cáliz",
        description:
            "Sobre el Cáliz se pone el Purificador en forma cuadrada y la Palia para cubir el cáliz cuando no se esté usando.",
    },
];

const MassItemsList = ({ item: Item }: Props) => {
    const { accentColor, gold, gold_600 } = useThemeColor();
    const [selectedItem, setSelectedItem] = useState<(typeof DATA)[0] | null>(
        null,
    );

    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={() => router.push("/screens/liturgical-items")}>
                <Image
                    style={{
                        width: 50,
                        height: 25,
                        tintColor: gold_600,
                        alignSelf: "flex-end",
                    }}
                    source={require("@/assets/icons/edit-attributes-fill.png")}
                />
            </Pressable>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        description={item.description}
                        source={require("@/assets/icons/altar-boy-cross-fill.png")}
                        onPress={() => setSelectedItem(item)}
                    />
                )}
            />
            <Modal visible={!!selectedItem} transparent animationType="fade">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        padding: 20,
                    }}
                >
                    <View
                        className="flex flex-col items-center"
                        style={{
                            backgroundColor: "white",
                            borderRadius: 20,
                            padding: 20,
                        }}
                    >
                        <Pressable
                            className="self-end"
                            onPress={() => setSelectedItem(null)}
                        >
                            <Image
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: accentColor,
                                }}
                                source={require("@/assets/icons/close.png")}
                            />
                        </Pressable>
                        <MassItemModal
                            name={selectedItem?.name ?? ""}
                            description={selectedItem?.description ?? ""}
                            source={require("@/assets/images/mass-items/copa.jpg")}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default MassItemsList;
