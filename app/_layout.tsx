import { Component, ReactNode } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/tokens';

type RootErrorBoundaryProps = { children: ReactNode };
type RootErrorBoundaryState = { error: Error | null };

class RootErrorBoundary extends Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  state: RootErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): RootErrorBoundaryState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <View style={styles.fallback}>
        <Text style={styles.fallbackTitle}>ERROR DE ARRANQUE</Text>
        <Text style={styles.fallbackMessage}>{this.state.error.message || 'Error desconocido'}</Text>
      </View>;
    }

    return this.props.children;
  }
}

export default function Layout() {
  return <GestureHandlerRootView style={{ flex: 1 }}>
    <RootErrorBoundary>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
    </RootErrorBoundary>
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
  fallbackTitle: {
    color: colors.lime,
    fontFamily: 'Quantico',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
  },
  fallbackMessage: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
});