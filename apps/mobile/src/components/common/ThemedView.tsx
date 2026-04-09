import React from "react";
// Expo
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    className?: string;
    children: React.ReactNode;
}

const ThemedView = ({ className, children }: Props) => {
    return (
        <SafeAreaView style={{ padding: 5 }} className={className}>
            {children}
        </SafeAreaView>
    );
};

export default ThemedView;
