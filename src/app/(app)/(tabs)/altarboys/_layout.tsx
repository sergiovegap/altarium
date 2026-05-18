// React
import { Image, Platform, Pressable } from "react-native";
// Expo
import { router, Stack, usePathname } from "expo-router";
// Custom

const AltarBoysLayout = () => {
  const pathname = usePathname();
  const isAndroid = Platform.OS === "android";

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        presentation: "card",
        animation: "fade",
        animationDuration: 100,
        headerTitleAlign: "center",
        headerLeft: () =>
          pathname !== "/(app)/(tabs)/masses" && (
            <Pressable onPress={() => router.back()}>
              <Image
                source={require("@/assets/icons/arrow-left.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: "black",
                }}
              />
            </Pressable>
          ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="id/index"
        options={{
          headerTitle: "Información",
          presentation: isAndroid ? "card" : "modal",
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
};

export default AltarBoysLayout;
