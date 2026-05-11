// Ract
import { Platform } from "react-native";
// Expo
import { router, Stack } from "expo-router";
// Custom
import CustomButton from "@/components/common/CustomButton";
import HeaderDownButton from "@/components/common/HeaderDownButton";

const MassesLayout = () => {
  const isAndroid = Platform.OS === "android";

  return (
    <Stack
      initialRouteName="calendar/index"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: "white" },
        animation: "fade",
        headerLeft: () => (
          <CustomButton
            onPress={() => router.back()}
            color={"black"}
            iconSource={require("@/assets/icons/arrow-left.png")}
          />
        ),
      }}
    >
      <Stack.Screen
        name="calendar/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="day/index"
        options={{
          title: "Misas del día",
        }}
      />
      <Stack.Screen
        name="day-mass-detail/index"
        options={{
          title: "Detalle de la misa",
        }}
      />
      <Stack.Screen
        name="form/index"
        options={{
          presentation: isAndroid ? "formSheet" : "modal",
          headerShown: isAndroid ? true : false,
          animation: "fade_from_bottom",
          headerLeft: () => (isAndroid ? <HeaderDownButton /> : null),
        }}
      />
    </Stack>
  );
};

export default MassesLayout;
