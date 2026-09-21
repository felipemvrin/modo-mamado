import { registerRootComponent } from 'expo';
import { StyleSheet, Text, View } from 'react-native';

function MinimalDiagnosticApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MODO MAMADO</Text>
      <Text style={styles.message}>ARRANQUE MINIMO OK</Text>
      <Text style={styles.meta}>Build diagnostico sin Expo Router</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#090909',
    padding: 24,
    gap: 10,
  },
  title: {
    color: '#C6FF00',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
  },
  message: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: '#A1A1AA',
    fontSize: 13,
  },
});

registerRootComponent(MinimalDiagnosticApp);
