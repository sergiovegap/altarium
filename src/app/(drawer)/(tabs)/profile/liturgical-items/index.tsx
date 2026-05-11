// Ract
import { useState } from "react";
import { FlatList, Image, Modal, Pressable, View } from "react-native";
// Expo
import { router } from "expo-router";
// Third-party libraries
// Custom
import CustomButton from "@/components/common/CustomButton";
import ListItem from "@/components/common/ListItem";
import ShadowLine from "@/components/common/ShadowLine";
import ThemedView from "@/components/common/ThemedView";
import MassItemModal from "@/components/screens/liturgical-items/LiturgicalItemModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import LiturgicalItemsMock from "@/utils/mocks/liturgical-items-mock";

const UserLiturgicalItemsList = () => {
  const { accentColor, gold_600 } = useThemeColor();
  const [selectedItem, setSelectedItem] = useState<
    (typeof LiturgicalItemsMock)[0] | null
  >(null);

  return (
    <ThemedView>
      <CustomButton
        color={gold_600}
        className="self-end"
        iconSource={require("@/assets/icons/edit-outline.png")}
        onPress={() => router.push("/(drawer)/(tabs)/profile/liturgical-items")}
      />
      <FlatList
        data={LiturgicalItemsMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <ListItem
              name={item.name}
              imageSource={item.image}
              onPress={() => setSelectedItem(item)}
            />
            <ShadowLine />
          </>
        )}
        ItemSeparatorComponent={() => <ShadowLine />}
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
              imageSource={selectedItem?.image}
            />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default UserLiturgicalItemsList;
