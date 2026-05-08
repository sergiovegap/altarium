// React
import { FlatList, Pressable } from "react-native";
// Expo
import { useLocalSearchParams, useRouter } from "expo-router";
// Custom
import ThemedView from "@/components/common/ThemedView";
import MassCard from "@/components/screens/masses/MassCard";
import NoMasses from "@/components/screens/masses/NoMasses";
import { useMassesByDay } from "@/hooks/useMassesByDay";

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
      <FlatList
        data={masses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push(
                `/(drawer)/(tabs)/masses/[day]/${item.id}?time=${item.time}&priest=${item.priest}&ministers=${encodeURIComponent(JSON.stringify(item.ministers))}&altarBoys=${encodeURIComponent(JSON.stringify(item.altarBoys))}`,
              )
            }
          >
            <MassCard time={item.time} priest={item.priest} />
          </Pressable>
        )}
      />
    </ThemedView>
  );
};

export default CalendarDay;
