// React
import { ActivityIndicator, Text, View } from "react-native";
// Expo
import { useLocalSearchParams } from "expo-router";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useMassDetail } from "@/hooks/useMassDetail";

const MassByID = () => {
  const { mass_id } = useLocalSearchParams<{ mass_id?: string }>();
  const { mass, loading } = useMassDetail(mass_id);

  if (loading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (!mass) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Misa no encontrada</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="m-5 gap-5">
      <View>
        <Text className="font-bold">Día:</Text>
        <Text>{mass.day}</Text>
      </View>
      <View>
        <Text className="font-bold">Hora:</Text>
        <Text>{mass.time}</Text>
      </View>
      <View>
        <Text className="font-bold">Sacerdote:</Text>
        <Text>
          {mass.priest
            ? `${mass.priest.name} ${mass.priest.last_name}`
            : "Sin sacerdote"}
        </Text>
      </View>
      <View>
        <Text className="font-bold">Ministros Extraordinarios:</Text>
        {mass.ministers.length > 0 ? (
          mass.ministers.map((m, i) => (
            <Text key={i}>
              {m.name} {m.last_name}
            </Text>
          ))
        ) : (
          <Text>Sin ministros asignados</Text>
        )}
      </View>
      <View>
        <Text className="font-bold">Monaguillos:</Text>
        {mass.altarBoys.length > 0 ? (
          mass.altarBoys.map((ab, i) => (
            <Text key={i}>
              {ab.name} {ab.last_name}
            </Text>
          ))
        ) : (
          <Text>Sin monaguillos asignados</Text>
        )}
      </View>
    </ThemedView>
  );
};
export default MassByID;
