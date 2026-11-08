import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { recordRouterDiagnostic } from '../utils/routerDiagnostics';

export default function RouterStartupProbe() {
  useEffect(() => {
    recordRouterDiagnostic('ruta index montada');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MODO MAMADO</Text>
      <Text style={styles.message}>ROUTER LINKING BYPASS OK</Text>
      <Text style={styles.meta}>Sin Linking nativo, Stack ni rutas productivas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 24,
    backgroundColor: '#090909',
  },
  title: {
    color: '#C6FF00',
    fontSize: 24,
    fontWeight: '700',
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