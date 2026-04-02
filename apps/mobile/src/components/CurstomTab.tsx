import React, { ComponentProps, Ref } from 'react';
import { View, Text, Pressable } from 'react-native';
import { TabTriggerSlotProps } from 'expo-router/ui';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Icon = ComponentProps<typeof FontAwesome>['name'];

export type TabButtonProps = TabTriggerSlotProps & {
  icon?: Icon;
  ref: Ref<View>;
};

const CurstomTab = ({ icon, children, isFocused, ...props }: TabButtonProps) => {
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