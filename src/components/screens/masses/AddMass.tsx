// React
import { Pressable, Text } from "react-native";
// Custom
import CustomButton from "@/components/common/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  onPress: () => void;
}

const AddMass = ({ onPress }: Props) => {
  const { accentColor, gold, gold_50, gold_100, gold_600 } = useThemeColor();

  return (
    <Pressable
      className="m-2 flex-row items-center justify-center rounded-lg p-1 pl-4 pr-4"
      style={{ backgroundColor: accentColor }}
      onPress={onPress}
    >
      <Text className="font-bold color-white">Añadir Misa</Text>
      <CustomButton
        iconSource={require("@/assets/icons/plus.png")}
        style={{ width: 10, height: 10 }}
        color="white"
      />
    </Pressable>
  );
};

export default AddMass;
