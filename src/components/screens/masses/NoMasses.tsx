// React
import { Pressable, Text } from "react-native";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  className?: string;
  onPress: () => void;
}

const NoMasses = ({ className, onPress }: Props) => {
  const { accentColor, gold, gold_50, gold_100, gold_600 } = useThemeColor();

  return (
    <ThemedView className={className}>
      <Text className="mb-3 text-2xl font-bold">!No hay Misas!</Text>
      <Pressable
        onPress={onPress}
        className="flex-row items-center rounded-lg p-2"
        style={{ backgroundColor: accentColor }}
      >
        <Text className="font-bold color-white">Añadir Misa</Text>
      </Pressable>
    </ThemedView>
  );
};

export default NoMasses;
