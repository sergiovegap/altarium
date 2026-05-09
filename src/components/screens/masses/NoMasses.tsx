// React
import { Pressable, Text } from "react-native";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useProfile } from "@/hooks/useProfile";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  className?: string;
  onPress: () => void;
}

const NoMasses = ({ className, onPress }: Props) => {
  const { gold_600 } = useThemeColor();
  const { profile } = useProfile();

  return (
    <ThemedView className={className}>
      <Text className="mb-3 text-2xl font-bold">!No hay Misas!</Text>

      {profile?.role === "Monaguillo" ? (
        <Pressable
          onPress={onPress}
          className="flex-row items-center rounded-lg p-2"
          style={{ backgroundColor: gold_600 }}
        >
          <Text className="font-bold color-white">Añadir Misa</Text>
        </Pressable>
      ) : (
        <Text className="mb-5 text-gray-500">
          Por favor espera a que un Ministro agregue una Misa
        </Text>
      )}
    </ThemedView>
  );
};

export default NoMasses;
