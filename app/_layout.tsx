import { Stack, type ErrorBoundaryProps } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/tokens';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <View style={styles.fallback}>
    <View style={styles.fallbackContent}>
      <Text style={styles.fallbackTitle}>ERROR DE ARRANQUE</Text>
      <Text style={styles.fallbackMessage}>{error.message || 'Error desconocido'}</Text>
      <Pressable accessibilityLabel='Reintentar iniciar la aplicación' accessibilityRole='button' onPress={retry} style={styles.retryButton}>
        <Text style={styles.retryLabel}>REINTENTAR</Text>
      </Pressable>
    </View>
  </View>;
}

export default function Layout() {
  return <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
  </GestureHandlerRootView>;
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  fallbackContent: {
    gap: 12,
  },
  fallbackTitle: {
    color: colors.lime,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
  },
  fallbackMessage: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  retryButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.lime,
  },
  retryLabel: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
