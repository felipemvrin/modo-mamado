import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Quantico_400Regular, Quantico_700Bold } from '@expo-google-fonts/quantico';
import { colors } from '../theme/tokens';
import { configureNotifications } from '../services/notifications';

export default function Layout() {
  const [fontsLoaded] = useFonts({ Quantico: Quantico_400Regular, QuanticoBold: Quantico_700Bold });
  useEffect(() => { void configureNotifications(); }, []);
  if (!fontsLoaded) return null;
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />;
}