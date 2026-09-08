import { useEffect, useRef, useState } from 'react';
import { AppState, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { cancelNotification, scheduleRestFinishedNotification } from '../services/notifications';

const PRESETS = [30, 60, 90, 120];
const DEFAULT_REST_SECONDS = 90;

const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export default function StandaloneTimer() {
  const [restSeconds, setRestSeconds] = useState(DEFAULT_REST_SECONDS);
  const [customInput, setCustomInput] = useState(String(DEFAULT_REST_SECONDS));
  const [restEndAt, setRestEndAt] = useState<number | null>(null);
  const [restTotalSeconds, setRestTotalSeconds] = useState(DEFAULT_REST_SECONDS);
  const [now, setNow] = useState(Date.now());
  const lastFeedbackAt = useRef(0);
  const restFinishedFeedbackSent = useRef(false);
  const notificationIdRef = useRef<string | null>(null);
  const restRequestId = useRef(0);
  const rest = restEndAt === null ? null : Math.max(0, Math.ceil((restEndAt - now) / 1000));

  const signalRestFinished = async () => {
    if (restFinishedFeedbackSent.current) return;
    const timestamp = Date.now();
    if (timestamp - lastFeedbackAt.current < 1200) return;
    lastFeedbackAt.current = timestamp;
    restFinishedFeedbackSent.current = true;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await new Promise((resolve) => setTimeout(resolve, 280));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await new Promise((resolve) => setTimeout(resolve, 280));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };
  useEffect(() => { if (restEndAt === null) return; const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, [restEndAt]);
  useEffect(() => { if (rest === 0) signalRestFinished(); }, [rest]);
  useEffect(() => { const subscription = AppState.addEventListener('change', (state) => { if (state === 'active' && rest === 0) signalRestFinished(); }); return () => subscription.remove(); }, [rest]);
  useEffect(() => () => {
    ++restRequestId.current;
    const notificationId = notificationIdRef.current;
    notificationIdRef.current = null;
    void cancelNotification(notificationId);
  }, []);

  const startRest = async (seconds: number, totalSeconds = seconds) => {
    const requestId = ++restRequestId.current;
    const previousNotificationId = notificationIdRef.current;
    notificationIdRef.current = null;
    restFinishedFeedbackSent.current = false;
    await cancelNotification(previousNotificationId);
    const endAt = Date.now() + seconds * 1000;
    setRestTotalSeconds(totalSeconds);
    setNow(Date.now());
    setRestEndAt(endAt);
    const nextNotificationId = await scheduleRestFinishedNotification(endAt);
    if (requestId !== restRequestId.current) {
      await cancelNotification(nextNotificationId);
      return;
    }
    notificationIdRef.current = nextNotificationId;
  };
  const stopRest = async () => {
    ++restRequestId.current;
    const previousNotificationId = notificationIdRef.current;
    notificationIdRef.current = null;
    restFinishedFeedbackSent.current = false;
    setRestTotalSeconds(restSeconds);
    setRestEndAt(null);
    setNow(Date.now());
    await cancelNotification(previousNotificationId);
  };
  const applyCustomSeconds = () => {
    const parsed = parseInt(customInput, 10);
    if (Number.isFinite(parsed) && parsed > 0) setRestSeconds(parsed);
  };

  if (rest !== null) {
    return <SafeAreaView style={styles.safe}>
      <View style={styles.restScreen}>
        <Pressable onPress={stopRest} style={styles.close}><MaterialCommunityIcons name="close" size={26} color={colors.text} /></Pressable>
        <Text style={styles.kicker}>DESCANSANDO</Text>
        <Text style={styles.restTitle}>{rest === 0 ? 'DALE NOMÁS' : formatTime(rest)}</Text>
        <View style={styles.progressTrack}><View style={[styles.progress, { width: `${Math.max(0, Math.min(100, ((restTotalSeconds - rest) / Math.max(restTotalSeconds, 1)) * 100))}%` }]} /></View>
        <View style={styles.restActions}>
          <Pressable onPress={() => startRest(rest + 30, restTotalSeconds + 30)} style={styles.secondary}><Text style={styles.secondaryText}>+30 SEG</Text></Pressable>
          <Pressable onPress={stopRest} style={styles.start}><Text style={styles.startText}>DETENER</Text></Pressable>
        </View>
      </View>
    </SafeAreaView>;
  }

  return <SafeAreaView style={styles.safe}>
    <View style={styles.setup}>
      <Pressable onPress={() => router.back()} style={styles.back}><MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} /><Text style={styles.backText}>VOLVER</Text></Pressable>
      <Text style={styles.kicker}>TIMER INDEPENDIENTE</Text>
      <Text style={styles.title}>DESCANSO</Text>
      <Text style={styles.subtitle}>Úsalo sin necesidad de una rutina activa.</Text>
      <View style={styles.presetRow}>
        {PRESETS.map((seconds) => {
          const isSelected = restSeconds === seconds && customInput === String(seconds);
          return <Pressable key={seconds} onPress={() => { setRestSeconds(seconds); setCustomInput(String(seconds)); }} style={[styles.preset, isSelected && styles.presetActive]}>
            <Text style={[styles.presetText, isSelected && styles.presetTextActive]}>{seconds}S</Text>
          </Pressable>;
        })}
      </View>
      <View style={styles.customField}>
        <Text style={styles.customLabel}>PERSONALIZADO (SEG)</Text>
        <TextInput value={customInput} onChangeText={setCustomInput} onEndEditing={applyCustomSeconds} keyboardType="number-pad" placeholder="90" placeholderTextColor={colors.muted} style={styles.customInput} />
      </View>
      <Pressable onPress={() => { applyCustomSeconds(); startRest(parseInt(customInput, 10) || restSeconds); }} style={styles.startSetup}>
        <MaterialCommunityIcons name="timer-outline" size={22} color={colors.background} />
        <Text style={styles.startText}>INICIAR DESCANSO</Text>
      </Pressable>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  setup: { flex: 1, padding: spacing.lg, gap: spacing.lg },
  back: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  backText: { color: colors.text, fontFamily: 'Quantico', fontSize: 12 },
  kicker: { color: colors.lime, fontFamily: 'Quantico', fontSize: 12, letterSpacing: 1 },
  title: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 38, marginTop: -10 },
  subtitle: { color: colors.muted, ...typography.body, marginTop: -10 },
  presetRow: { flexDirection: 'row', gap: spacing.sm },
  preset: { flex: 1, minHeight: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm },
  presetActive: { backgroundColor: colors.lime, borderColor: colors.lime },
  presetText: { color: colors.muted, fontFamily: 'QuanticoBold', fontSize: 16 },
  presetTextActive: { color: colors.background },
  customField: { gap: spacing.xs },
  customLabel: { color: colors.muted, fontFamily: 'Quantico', fontSize: 11 },
  customInput: { minHeight: 56, textAlign: 'center', color: colors.text, fontFamily: 'QuanticoBold', fontSize: 22, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm },
  close: { position: 'absolute', top: spacing.lg, right: spacing.lg },
  restScreen: { flex: 1, padding: spacing.lg, justifyContent: 'center', alignItems: 'center', gap: spacing.md },
  restTitle: { color: colors.lime, fontFamily: 'QuanticoBold', fontSize: 63, textAlign: 'center', marginVertical: spacing.md },
  progressTrack: { height: 8, width: '100%', backgroundColor: colors.border },
  progress: { height: '100%', backgroundColor: colors.lime },
  restActions: { flexDirection: 'row', gap: spacing.md, width: '100%', marginTop: spacing.lg },
  secondary: { flex: 1, minHeight: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm },
  secondaryText: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 13 },
  start: { flex: 1, minHeight: 60, backgroundColor: colors.lime, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.sm, borderRadius: radius.sm },
  startSetup: { minHeight: 60, backgroundColor: colors.lime, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.sm, borderRadius: radius.sm, marginTop: 'auto' },
  startText: { color: colors.background, fontFamily: 'QuanticoBold', fontSize: 13 },
});
