// React
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
// Expo
import { Href, Link, usePathname } from "expo-router";

interface Props {
  label: string;
  baseColor: string;
  accentColor: string;
  route: Href;
  iconSource: ImageSourcePropType;
}

const CustomDrawerItems = ({
  label,
  baseColor,
  accentColor,
  route,
  iconSource,
}: Props) => {
  const pathname = usePathname();
  const isFocused = pathname === route;

  return (
    <Link
      href={route}
      asChild
      className="m-2 w-full rounded-[10px] border-[1px] border-gray-400 bg-white p-2"
      style={{
        borderColor: isFocused ? accentColor : baseColor,
        backgroundColor: isFocused ? accentColor : "white",
      }}
    >
      <Pressable className="flex-row items-center justify-between">
        <View className="flex-row items-center p-1">
          <View
            style={{
              marginRight: 12,
            }}
          >
            <Image
              source={iconSource}
              style={{
                backgroundColor: isFocused ? accentColor : "white",
                tintColor: isFocused ? "white" : baseColor,
                width: 26,
                height: 26,
              }}
            />
          </View>
          <Text
            style={{
              color: isFocused ? "white" : baseColor,
              fontWeight: isFocused ? "600" : "400",
            }}
          >
            {label}
          </Text>
        </View>
        <Image
          source={require("@/assets/icons/arrow-right.png")}
          style={{
            tintColor: isFocused ? "white" : baseColor,
            width: 24,
            height: 24,
          }}
        />
      </Pressable>
    </Link>
  );
};

export default CustomDrawerItems;
