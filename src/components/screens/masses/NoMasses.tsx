// React
import { Text, View } from "react-native";
// Custom
import CustomButton from "@/components/common/CustomButton";
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import AddMass from "./AddMass";

interface Props {
  className?: string;
  onPress: () => void;
}

const NoMasses = ({ className, onPress }: Props) => {
  const { accentColor, gold, gold_50, gold_100, gold_600 } = useThemeColor();

  return (
    <ThemedView className={className}>
      <Text className="font-bold">!No hay Misas registradas!</Text>
      {/* <AddMass onPress={onPress} /> */}
      <View
        className="m-2 flex-row items-center justify-center rounded-lg p-1 pl-4 pr-4"
        style={{ backgroundColor: accentColor }}
      >
        <Text className="font-bold color-white">Añadir Misa</Text>
        <CustomButton
          iconSource={require("@/assets/icons/plus.png")}
          style={{ width: 25, height: 25 }}
          color="white"
          onPress={onPress}
        />
      </View>
    </ThemedView>
  );
};

export default NoMasses;
