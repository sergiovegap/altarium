// React
import React, { useEffect } from "react";
// Expo
import { Slot, SplashScreen } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot />
   </GestureHandlerRootView>
  )
}

export default RootLayout;