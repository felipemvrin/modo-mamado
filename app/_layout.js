import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Quantico_400Regular, Quantico_700Bold } from '@expo-google-fonts/quantico';
import { colors } from '../theme/tokens';
export default function Layout() {
    const [fontsLoaded] = useFonts({ Quantico: Quantico_400Regular, QuanticoBold: Quantico_700Bold });
    if (!fontsLoaded)
        return null;
    return <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}/>
  </GestureHandlerRootView>;
}
