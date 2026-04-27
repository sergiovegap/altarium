// Ract
import React, { useState } from "react";
import { FlatList, Image, Modal, Pressable, View } from "react-native";
// Expo
import { router } from "expo-router";
// Third-party libraries
import { FlashList } from "@shopify/flash-list";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import MassItemCard from "@/components/screens/liturgical-items/LiturgicalItemCard";
import MassItemModal from "@/components/screens/liturgical-items/LiturgicalItemModal";
import CustomButton from "@/components/common/CustomButton";
import ListItem from "@/components/common/ListItem";
import LiturgicalItemsMock from "@altarium/packages/core/utils/liturgical-items-mock";
import ShadowLine from "@/components/common/ShadowLine";

interface Props {
    item: typeof ListItem;
}

const UserLiturgicalItemsList = ({ item }: Props) => {
    const { accentColor, gold, gold_600 } = useThemeColor();
    const [selectedItem, setSelectedItem] = useState<
        (typeof LiturgicalItemsMock)[0] | null
    >(null);

    return (
        <ThemedView style={{ flex: 1 }}>
            <CustomButton
                color={gold_600}
                className="self-end"
                iconSource={require("@/assets/icons/add-fill.png")}
                onPress={() =>
                    router.push("/(drawer)/(tabs)/profile/liturgical-items")
                }
            />
            <FlashList
                data={LiturgicalItemsMock}
                keyExtractor={(item) => item.id}
                numColumns={1}
                renderItem={({ item }) => (
                    <ListItem
                        name={item.name}
                        imageSource={item.image}
                        onPress={() => setSelectedItem(item)}
                    />
                )}
                ItemSeparatorComponent={() => <ShadowLine />}
            />
            {/* <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <MassItemCard
                        name={item.name}
                        description={item.description}
                        source={require("@/assets/icons/altar-boy-cross-fill.png")}
                        onPress={() => setSelectedItem(item)}
                    />
                )}
            /> */}
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
                            imageSource={selectedItem?.image}
                        />
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
};

export default UserLiturgicalItemsList;
