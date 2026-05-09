// React
import {
  Image,
  ImageSourcePropType,
  Text,
  View,
  ViewProps,
} from "react-native";

interface Props extends ViewProps {
  userName?: string;
  imageSource?: ImageSourcePropType;
}

const Avatar = ({
  userName,
  imageSource = require("@/assets/images/development/avatar.png"),
}: Props) => {
  return (
    <View
      className="mb-1 flex items-center justify-center shadow-md"
      style={{}}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
        }}
        source={imageSource}
      />
      <Text
        style={{
          color: "black",
          fontWeight: 500,
        }}
        className="text-2xl"
      >
        {userName}
      </Text>
    </View>
  );
};

export default Avatar;
