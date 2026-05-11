// React
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
// Expo
import { router } from "expo-router";
// Custom
import MassCard from "@/components/screens/masses/MassCard";
import { useAltarBoyMasses } from "@/hooks/useAltarBoyMasses";
import { useProfile } from "@/hooks/useProfile";

const UserMassesList = () => {
  const { profile } = useProfile();
  const { masses, loading } = useAltarBoyMasses(profile?.id || "");

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 grow">
      <FlatList
        data={masses}
        keyExtractor={(mass) => mass.id}
        renderItem={({ item: mass }) => (
          <Pressable
            onPress={() =>
              router.push(
                `/(drawer)/(tabs)/masses/day-mass-detail?mass_id=${mass.id}`,
              )
            }
          >
            <MassCard time={mass.time} priest={mass.priest_id} />
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center justify-self-center">
            <Text className="text-gray-500">¡No tienes Misas agendadas!</Text>
            {/* <Text className="text-center text-gray-500">
              Puedes asignarte a una Misa dando click en el botón de abajo
            </Text> */}
            <Pressable
              className="mt-4 rounded-lg border border-gray-300 bg-gray-100 p-3"
              onPress={() => router.push("/(drawer)/(tabs)/profile/mass-form")}
            >
              <Text className="font-bold text-gray-500">
                Asignarme a una Misa
              </Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
};

export default UserMassesList;
