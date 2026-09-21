import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <Text style={styles.title}>MODO MAMADO</Text>
      <Text style={styles.message}>EXPO ROUTER OK</Text>
      <Text style={styles.meta}>Home mínima sin store ni SQLite</Text>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#090909' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 24,
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
