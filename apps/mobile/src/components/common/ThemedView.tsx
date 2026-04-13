import React from "react";
import { ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Expo

interface Props extends ViewProps {
    className?: string;
    children?: React.ReactNode;
}

const ThemedView = ({ className, children }: Props) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 10,
            }}
            className={className}
            edges={{ top: "off" }}
        >
            {children}
        </SafeAreaView>
    );
};

export default ThemedView;
