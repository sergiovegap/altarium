// React
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Expo
import { Slot } from "expo-router";
// Custom
import { AuthProvider } from "@/features/auth/AuthContext";

const RootLayout = () => {
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
