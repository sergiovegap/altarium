// React
import React from 'react';
import { useColorScheme } from 'react-native';
// Expo
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import { Colors } from '../constants/theme';
import { VectorIcon } from 'expo-router/build/primitives';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="(tabs)/MassesScreen">
        <NativeTabs.Trigger.Label>Misas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(tabs)/FormationScreen">
        <NativeTabs.Trigger.Label>Notificaciones</NativeTabs.Trigger.Label>
        {/* <NativeTabs.Trigger.VectorIcon name="bell" family={FontAwesome} /> */}
        <NativeTabs.Trigger.Icon
          src={<VectorIcon name="bicycle" family={FontAwesome} />}
          renderingMode="template"
        />
        
      </NativeTabs.Trigger>
      

      {/* <NativeTabs.Trigger name="(tabs)/formation/FormationScreen">
        <NativeTabs.Trigger.Label>Formación</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger> */}
      
      <NativeTabs.Trigger name="(tabs)/ProfileScreen">
        <NativeTabs.Trigger.Label>Perfil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
