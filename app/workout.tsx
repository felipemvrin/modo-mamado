import { useEffect, useRef, useState } from 'react';
import { AppState, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getExerciseById, getExercisesForMuscles } from '../data/routines';
import { getLastSetLog } from '../database/workouts';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { useWorkoutStore } from '../store/workout';
import { cancelNotification, scheduleRestFinishedNotification } from '../services/notifications';

const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export default function Workout() {
  const { activeWorkout, completedSets, completeSet, logSet, finishWorkout, substitutions } = useWorkoutStore();
  const exercises = activeWorkout
    ? getExercisesForMuscles(activeWorkout).map((item) => (substitutions[item.id] ? getExerciseById(substitutions[item.id]) ?? item : item))
    : [];
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [restEndAt, setRestEndAt] = useState<number | null>(null);
  const [restTotalSeconds, setRestTotalSeconds] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [weightInput, setWeightInput] = useState('');
  const [repsInput, setRepsInput] = useState('');
  const [lastLog, setLastLog] = useState<{ weight: number; reps: number } | null>(null);
  const [failedMediaById, setFailedMediaById] = useState<Record<string, true>>({});
  const lastFeedbackAt = useRef(0);
  const restFinishedFeedbackSent = useRef(false);
  const notificationIdRef = useRef<string | null>(null);
  const restRequestId = useRef(0);
  const current = exercises[exerciseIndex];
  const rest = restEndAt === null ? null : Math.max(0, Math.ceil((restEndAt - now) / 1000));
  const signalRestFinished = async () => { if (restFinishedFeedbackSent.current) return; const timestamp = Date.now(); if (timestamp - lastFeedbackAt.current < 1200) return; lastFeedbackAt.current = timestamp; restFinishedFeedbackSent.current = true; await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); await new Promise((resolve) => setTimeout(resolve, 280)); await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); await new Promise((resolve) => setTimeout(resolve, 280)); await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); };
  useEffect(() => { if (restEndAt === null) return; const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, [restEndAt]);
  useEffect(() => { if (rest === 0) signalRestFinished(); }, [rest]);
  useEffect(() => { const subscription = AppState.addEventListener('change', (state) => { if (state === 'active' && rest === 0) signalRestFinished(); }); return () => subscription.remove(); }, [rest]);
  useEffect(() => () => {
    ++restRequestId.current;
    const notificationId = notificationIdRef.current;
    notificationIdRef.current = null;
    void cancelNotification(notificationId);
  }, []);
  useEffect(() => {
    if (!current) return;
    const log = getLastSetLog(current.id);
    setLastLog(log);
    setWeightInput(log ? String(log.weight) : '');
    setRepsInput(log ? String(log.reps) : '');
  }, [current?.id, setIndex]);
  if (!activeWorkout || !current) return null;
  const totalSets = exercises.reduce((sum, item) => sum + item.sets, 0);
  const completedTotal = completedSets.length;
  const isLastSet = exerciseIndex === exercises.length - 1 && setIndex === current.sets - 1;
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
  const skipRest = async () => {
    ++restRequestId.current;
    const previousNotificationId = notificationIdRef.current;
    notificationIdRef.current = null;
    restFinishedFeedbackSent.current = false;
    setRestTotalSeconds(0);
    setRestEndAt(null);
    setNow(Date.now());
    await cancelNotification(previousNotificationId);
  };
  const markSet = async () => { const weight = parseFloat(weightInput.replace(',', '.')) || 0; const reps = parseInt(repsInput, 10) || 0; logSet(exerciseIndex, setIndex, current.id, weight, reps); completeSet(exerciseIndex, setIndex); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); if (isLastSet) { await skipRest(); finishWorkout(); router.replace('/'); return; } await startRest(current.restSeconds); if (setIndex + 1 < current.sets) setSetIndex(setIndex + 1); else { setExerciseIndex(exerciseIndex + 1); setSetIndex(0); } };
  if (rest !== null) return <SafeAreaView style={styles.safe}><View style={styles.restScreen}><Text style={styles.kicker}>DESCANSANDO</Text><Text style={styles.restTitle}>{rest === 0 ? 'DALE NOMÁS' : formatTime(rest)}</Text><View style={styles.progressTrack}><View style={[styles.progress, { width: `${Math.max(0, Math.min(100, ((restTotalSeconds - rest) / Math.max(restTotalSeconds, 1)) * 100))}%` }]} /></View><Text style={styles.nextLabel}>PRÓXIMA SERIE</Text><Text style={styles.next}>{current.name.toUpperCase()} · {setIndex + 1}/{current.sets}</Text><View style={styles.restActions}><Pressable onPress={() => startRest(rest + 30, restTotalSeconds + 30)} style={styles.secondary}><Text style={styles.secondaryText}>+30 SEG</Text></Pressable><Pressable onPress={skipRest} style={styles.start}><Text style={styles.startText}>SALTAR DESCANSO</Text></Pressable></View></View></SafeAreaView>;
  return <SafeAreaView style={styles.safe}><View style={styles.container}><View style={styles.header}><Pressable onPress={() => router.back()}><MaterialCommunityIcons name="close" size={26} color={colors.text} /></Pressable><Text style={styles.headerTitle}>{activeWorkout.join(' + ').toUpperCase()}</Text><Text style={styles.counter}>{completedTotal}/{totalSets}</Text></View><View style={styles.main}><Text style={styles.kicker}>EJERCICIO {String(exerciseIndex + 1).padStart(2, '0')} / {String(exercises.length).padStart(2, '0')}</Text><View style={styles.thumbnail}>{(current.mediaSource || current.mediaUrl) && !failedMediaById[current.id] ? <Image source={current.mediaSource ?? { uri: current.mediaUrl }} style={styles.thumbnailImage} onError={() => setFailedMediaById((previous) => (previous[current.id] ? previous : { ...previous, [current.id]: true }))} /> : <MaterialCommunityIcons name="image-off-outline" size={28} color={colors.muted} />}</View><Text style={styles.exerciseName}>{current.name.toUpperCase()}</Text><Text style={styles.equipment}>{current.equipment.toUpperCase()}</Text><View style={styles.prescription}><Text style={styles.seriesLabel}>SERIE</Text><Text style={styles.series}>{setIndex + 1} <Text style={styles.seriesMuted}>/ {current.sets}</Text></Text><View style={styles.repsBox}><Text style={styles.reps}>{current.reps}</Text><Text style={styles.repsLabel}>REPETICIONES</Text></View>
    <View style={styles.logRow}>
      <View style={styles.logField}><Text style={styles.logLabel}>PESO (KG)</Text><TextInput value={weightInput} onChangeText={setWeightInput} keyboardType="decimal-pad" placeholder="0" placeholderTextColor={colors.muted} style={styles.logInput} /></View>
      <View style={styles.logField}><Text style={styles.logLabel}>REPS REALES</Text><TextInput value={repsInput} onChangeText={setRepsInput} keyboardType="number-pad" placeholder="0" placeholderTextColor={colors.muted} style={styles.logInput} /></View>
    </View>
    {lastLog && <Text style={styles.lastLog}>ÚLTIMA VEZ: {lastLog.weight}KG × {lastLog.reps}</Text>}
    </View></View><Pressable onPress={markSet} style={styles.complete}><MaterialCommunityIcons name="check" size={28} color={colors.background} /><Text style={styles.completeText}>SERIE COMPLETADA</Text></Pressable></View></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, container: { flex: 1, padding: spacing.lg, justifyContent: 'space-between' }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, headerTitle: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 14 }, counter: { color: colors.lime, fontFamily: 'QuanticoBold' }, main: { gap: spacing.sm, alignItems: 'center' }, thumbnail: { width: 72, height: 72, borderRadius: radius.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginTop: spacing.sm }, thumbnailImage: { width: '100%', height: '100%' }, kicker: { color: colors.lime, fontFamily: 'Quantico', fontSize: 12, letterSpacing: 1 }, exerciseName: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 31, textAlign: 'center', marginTop: spacing.md }, equipment: { color: colors.muted, fontFamily: 'Quantico', fontSize: 11 }, prescription: { width: '100%', marginTop: spacing.lg, padding: spacing.lg, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, alignItems: 'center' }, seriesLabel: { color: colors.muted, fontFamily: 'Quantico', fontSize: 12 }, series: { color: colors.lime, fontFamily: 'QuanticoBold', fontSize: 70, lineHeight: 78 }, seriesMuted: { color: colors.muted, fontSize: 30 }, repsBox: { alignItems: 'center', marginTop: spacing.sm }, reps: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 27 }, repsLabel: { color: colors.muted, fontFamily: 'Quantico', fontSize: 10 }, logRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md, width: '100%', justifyContent: 'center' }, logField: { alignItems: 'center', gap: 4 }, logLabel: { color: colors.muted, fontFamily: 'Quantico', fontSize: 9 }, logInput: { minWidth: 80, textAlign: 'center', color: colors.text, fontFamily: 'QuanticoBold', fontSize: 18, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm }, lastLog: { color: colors.muted, fontFamily: 'Quantico', fontSize: 10, marginTop: spacing.sm }, complete: { minHeight: 64, backgroundColor: colors.lime, borderRadius: radius.sm, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }, completeText: { color: colors.background, fontFamily: 'QuanticoBold', fontSize: 14 }, restScreen: { flex: 1, padding: spacing.lg, justifyContent: 'center', alignItems: 'center', gap: spacing.md }, restTitle: { color: colors.lime, fontFamily: 'QuanticoBold', fontSize: 63, textAlign: 'center', marginVertical: spacing.md }, progressTrack: { height: 8, width: '100%', backgroundColor: colors.border }, progress: { height: '100%', backgroundColor: colors.lime }, nextLabel: { color: colors.muted, fontFamily: 'Quantico', fontSize: 11, marginTop: spacing.xl }, next: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 16, textAlign: 'center' }, restActions: { width: '100%', gap: spacing.sm, marginTop: spacing.xl }, secondary: { minHeight: 56, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', borderRadius: radius.sm }, secondaryText: { color: colors.text, fontFamily: 'QuanticoBold' }, start: { minHeight: 60, backgroundColor: colors.lime, justifyContent: 'center', alignItems: 'center', borderRadius: radius.sm }, startText: { color: colors.background, fontFamily: 'QuanticoBold' } });