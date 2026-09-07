import { Platform } from 'react-native';

export const colors = {
  background: '#090909',
  surface: '#121212',
  card: '#191919',
  border: '#2A2A2A',
  lime: '#C6FF00',
  limeDim: '#263300',
  text: '#F5F5F5',
  muted: '#A1A1AA',
  error: '#FF4D4D',
} as const;

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radius = { sm: 4, md: 8, lg: 14 } as const;
export const typography = {
  display: { fontSize: 42, lineHeight: 46, fontWeight: '700' as const },
  h1: { fontSize: 28, lineHeight: 32, fontWeight: '700' as const },
  h2: { fontSize: 20, lineHeight: 24, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 22 },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '700' as const, letterSpacing: 1 },
  timer: { fontSize: Platform.select({ ios: 84, android: 76, default: 80 }), lineHeight: 92, fontWeight: '700' as const },
} as const;