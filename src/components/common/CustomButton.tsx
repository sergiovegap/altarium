// React
import {
  Image,
  ImageSourcePropType,
  Pressable,
  PressableProps,
} from "react-native";

interface Props extends PressableProps {
  color?: string;
  styles?: {};
  className?: string;
  iconSource?: ImageSourcePropType;
  onPress?: PressableProps["onPress"];
}

const CustomButton = ({
  color,
  styles,
  className,
  iconSource,
  onPress,
}: Props) => {
  return (
    <Pressable
      //   onPress={onPress}
      className={`flex flex-row justify-between ${className}`}
      style={styles}
    >
      <Image
        source={iconSource}
        style={{ width: 25, height: 25, tintColor: color }}
      />
    </Pressable>
  );
};

export default CustomButton;
