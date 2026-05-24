import CustomButton from "@/components/common/CustomButton";
import { router, Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, presentation: "fullScreenModal" }}
    >
      <Stack.Screen name="login/index" />
      <Stack.Screen
        name="register/index"
        options={{
          headerShown: true,
          title: "",
          presentation: "formSheet",
          headerLeft: () => (
            <CustomButton
              onPress={() => router.back()}
              color={"black"}
              iconSource={require("@/assets/icons/arrow-left.png")}
            />
          ),
        }}
      />
      <Stack.Screen name="verify-email/index" />
    </Stack>
  );
};

export default AuthLayout;
