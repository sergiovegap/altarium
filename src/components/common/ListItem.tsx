import ThemedView from "@/components/common/ThemedView";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
  ViewProps,
} from "react-native";

interface Props extends ViewProps {
  name: string;
  imageSource?: ImageSourcePropType;
  onPress?: () => void;
}

const ListItem = ({ name, imageSource, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <ThemedView className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={imageSource}
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              marginRight: 10,
            }}
          />
          <Text className="font-bold text-gray-700">{name}</Text>
        </View>
        <Image
          source={require("@/assets/icons/touch.png")}
          style={{ width: 18, height: 18, tintColor: "gray" }}
          className=""
        />
      </ThemedView>
    </Pressable>
  );
};

export default ListItem;
