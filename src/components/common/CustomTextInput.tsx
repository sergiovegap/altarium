// React
import {
  Image,
  ImageSourcePropType,
  InputModeOptions,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface Props extends TextInputProps {
  className?: string;
  placeholder?: string;
  iconSource?: ImageSourcePropType;
  iconColor?: string;
  inputmode?: InputModeOptions;
}

const CustomTextInput = ({
  placeholder,
  iconSource,
  iconColor,
  inputmode,
  ...rest
}: Props) => {
  return (
    <View className="flex-row items-center rounded-lg border border-gray-300 p-3">
      <Image
        source={iconSource}
        style={{ width: 20, height: 20, tintColor: iconColor }}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        inputMode={inputmode}
        className="ml-2 color-gray-500"
        placeholder={placeholder}
        style={{ color: "black", width: "100%" }}
        {...rest}
      />
    </View>
  );
};

export default CustomTextInput;
