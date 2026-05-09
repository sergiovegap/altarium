// React
import { Image, Pressable } from "react-native";
// Expo
import { router, Stack, usePathname } from "expo-router";
// Custom

const AltarBoysLayout = () => {
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        presentation: "card",
        animation: "fade",
        animationDuration: 100,
        headerTitleAlign: "center",
        headerLeft: () =>
          pathname !== "/(drawer)/(tabs)/masses" && (
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
        dangerouslySingular={(id) => id}
        name="id/index"
        options={{ headerTitle: "Información" }}
      />
    </Stack>
  );
};

export default AltarBoysLayout;
