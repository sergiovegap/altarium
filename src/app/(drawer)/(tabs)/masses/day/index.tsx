// React
import { ActivityIndicator, FlatList, Pressable } from "react-native";
// Expo
import { useLocalSearchParams, useRouter } from "expo-router";
// Custom
import ThemedView from "@/components/common/ThemedView";
import MassCard from "@/components/screens/masses/MassCard";
import NoMasses from "@/components/screens/masses/NoMasses";
import { useMassesByDay } from "@/hooks/useMassesByDay";

const CalendarDay = () => {
  const router = useRouter();
  const { day } = useLocalSearchParams();
  const { masses, loading } = useMassesByDay(day);

  return masses.length === 0 ? (
    <NoMasses
      className="items-center justify-center"
      onPress={() =>
        router.push({
          pathname: "/(drawer)/(tabs)/masses/form",
          params: { day },
        })
      }
    />
  ) : (
    <ThemedView className="m-2">
      {loading ? (
        <ActivityIndicator color="gray" />
      ) : (
        <FlatList
          data={masses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push(
                  `/(drawer)/(tabs)/masses/day-mass-detail?mass_id=${item.id}`,
                )
              }
            >
              <MassCard time={item.time} priest={item.priest} />
            </Pressable>
          )}
        />
      )}
    </ThemedView>
  );
};

export default CalendarDay;
