// React
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Expo
import { Redirect, Slot } from "expo-router";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { AuthProvider, useAuth } from "@/features/auth/AuthContext";

function RootLayoutNav() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <ThemedView>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (!user) {
    return <Redirect href="/register" />;
  }
  return <Slot />;
}

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
