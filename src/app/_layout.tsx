// React
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Expo
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
// Custom
import { AuthProvider } from "@/features/auth/AuthContext";

const RootLayout = () => {
  const [loaded] = useFonts({
    ManjariBold: require("@/assets/fonts/Manjari-Bold.ttf"),
    ManjariRegular: require("@/assets/fonts/Manjari-Regular.ttf"),
    ManjariThin: require("@/assets/fonts/Manjari-Thin.ttf"),
    Outfit: require("@/assets/fonts/Outfit.ttf"),
    Playpen: require("@/assets/fonts/Playpen.ttf"),
  });

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default RootLayout;
