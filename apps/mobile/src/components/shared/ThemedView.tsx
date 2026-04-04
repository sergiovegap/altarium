import React from 'react';
// Expo
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
   children: React.ReactNode;
}

const ThemedView = ({ children }: Props) => {
  return (
    <SafeAreaView style={{ padding: 5 }}>
      {children}
    </SafeAreaView>
  )
}

export default ThemedView;