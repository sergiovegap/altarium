import { Text, Pressable, PressableProps, Image, View } from 'react-native';
import React from 'react';

interface Props extends PressableProps {
   icon: any;
   color: string;
}

const ThemedTabIcon = ({icon, color}: Props) => {
  return (
      <Image source={icon} style={{ tintColor: color, width: 24, height: 24 }} />
  )
}

export default ThemedTabIcon;