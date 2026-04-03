import React, { ComponentProps, Ref } from 'react';
import { View, Text, Pressable } from 'react-native';
import { TabTriggerSlotProps } from 'expo-router/ui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NativeTabsProps } from 'expo-router/unstable-native-tabs';
import { VectorIconProps } from 'expo-router/build/primitives/types';

type Icon = ComponentProps<typeof FontAwesome>['name'];

interface Prpos extends NativeTabsProps {
  label: string;
  icon: Icon;
  family?: string;
};

const CurstomTab = ({ icon, ...props }: Prpos) => {
  return (
    <Pressable
      {...props}
      style={[
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 5,
          padding: 10,
        },
        isFocused ? { backgroundColor: 'white' } : undefined,
      ]}>
      <FontAwesome name={icon} />
      <Text style={[{ fontSize: 16 }, isFocused ? { color: 'white' } : undefined]}>{children}</Text>
    </Pressable>
  )
}

export default CurstomTab;