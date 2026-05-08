// React
// Expo
import { router, Stack, usePathname } from "expo-router";
// Custom
import CustomButton from "@/components/common/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";

const MassesLayout = () => {
  const pathname = usePathname();
  const { accentColor } = useThemeColor();

  return (
    <Stack
      initialRouteName="index"
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
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[day]/index"
        options={{
          title: "Misas del día",
        }}
      />
      <Stack.Screen
        name="[day]/[day]"
        options={{
          title: "Detalle de la misa",
        }}
      />
      <Stack.Screen
        name="form/index"
        options={{
          title: "Registrar Misa",
          presentation: "pageSheet",
          headerLeft: () => null,
        }}
      />
    </Stack>
  );
};

export default MassesLayout;
