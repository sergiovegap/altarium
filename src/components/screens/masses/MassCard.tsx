import ThemedView from "@/components/common/ThemedView";
import { Image, Text, View, ViewProps } from "react-native";

interface Props extends ViewProps {
  time?: string;
  priest?: string | null;
}

const MassCard = ({ time, priest }: Props) => {
  return (
    <ThemedView className="mb-3 mt-1 flex-row content-center rounded-lg border border-gray-300 bg-gray-100">
      <Image
        // source={require("@/assets/icons/eucaristia.png")}
        source={require("@/assets/icons/communion-fill.png")}
        style={{ width: 26, height: 40 }}
      />
      <View className="ml-5 flex-col justify-center">
        <Text className="font-bold">{time}</Text>
        <Text className="text-sm">{priest}</Text>
      </View>
    </ThemedView>
  );
};

export default MassCard;
