// React
import React from "react";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
// Expo
import { Redirect } from "expo-router";
// Styles
import "../../global.css";

const App = () => {
    // const insets = useSafeAreaInsets();

    return (
        <SafeAreaProvider
        // style={{
        //     paddingTop: insets.top,
        //     paddingBottom: insets.bottom,
        //     height: insets.top,
        // }}
        >
            <Redirect href="/(drawer)/(tabs)/masses" />
        </SafeAreaProvider>
    );
};

export default App;
