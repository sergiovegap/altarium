// React
import { Text } from "react-native";
// Third-party libraries
import { FlashList } from "@shopify/flash-list";
// Expo
import { router } from "expo-router";
// Custom
import ShadowLine from "@/components/common/ShadowLine";
import ThemedView from "@/components/common/ThemedView";
import AltarBoyCard from "@/components/screens/altarboys/AltarBoyCard";
import { useAltarBoys } from "@/hooks/useAltarBoys";
import { useProfile } from "@/hooks/useProfile";

const AltarBoys = () => {
  const { profile } = useProfile();
  const { altarBoys, loading } = useAltarBoys(profile?.parish_id);

  if (!profile) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <Text className="text-gray-500">No hay Monaguillos registrados</Text>
      </ThemedView>
    );
  }
  // ── Load data ──────────────────────────────────────────
  if (loading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Cargando monaguillos...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <FlashList
        data={altarBoys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AltarBoyCard
            name={`${item.name} ${item.last_name}`}
            profilePhoto={item.photo ? { uri: item.photo } : undefined}
            onPress={() =>
              router.push(`/(drawer)/(tabs)/altarboys/id?id=${item.id}`)
            }
          />
        )}
        ItemSeparatorComponent={() => <ShadowLine />}
      />
    </ThemedView>
  );
};

export default AltarBoys;
