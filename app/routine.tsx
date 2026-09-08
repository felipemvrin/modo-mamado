import { useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getExerciseById, getExercisesForMuscles, getSubstitutes } from '../data/routines';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { useWorkoutStore } from '../store/workout';
import { Exercise } from '../types/workout';

export default function Routine() {
  const { selectedMuscles, startWorkout, availableEquipment, substitutions, setSubstitute, clearSubstitute } = useWorkoutStore();
  const [pickerFor, setPickerFor] = useState<Exercise | null>(null);
  const baseExercises = getExercisesForMuscles(selectedMuscles);
  const exercises = baseExercises.map((item) => (substitutions[item.id] ? getExerciseById(substitutions[item.id]) ?? item : item));
  const canStartWorkout = exercises.length > 0;
  const substituteOptions = pickerFor ? getSubstitutes(pickerFor, availableEquipment) : [];
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Pressable onPress={() => router.back()} style={styles.back}><MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} /><Text style={styles.backText}>VOLVER</Text></Pressable>
    <Text style={styles.kicker}>RUTINA SUGERIDA / {exercises.length} EJERCICIOS</Text><Text style={styles.title}>{selectedMuscles.join(' + ').toUpperCase()}</Text><Text style={styles.subtitle}>Hoy no toca pensar. Solo ejecutar.</Text>
    <View style={styles.list}>{exercises.map((item, index) => {
      const original = baseExercises[index];
      const isSubstituted = original.id !== item.id;
      return <View key={original.id} style={styles.exercise}>
        <View style={styles.number}><Text style={styles.numberText}>{String(index + 1).padStart(2, '0')}</Text></View>
        <View style={styles.info}><Text style={styles.name}>{item.name}</Text><Text style={styles.detail}>{item.equipment.toUpperCase()} · {item.restSeconds}s DESCANSO</Text></View>
        <View style={styles.prescription}><Text style={styles.sets}>{item.sets}</Text><Text style={styles.reps}>SERIES · {item.reps} REPS</Text></View>
        <Pressable onPress={() => setPickerFor(original)} style={styles.swap} hitSlop={8}>
          <MaterialCommunityIcons name={isSubstituted ? 'swap-horizontal-bold' : 'swap-horizontal'} size={20} color={isSubstituted ? colors.lime : colors.muted} />
        </Pressable>
      </View>;
    })}</View>
    <View style={styles.note}><MaterialCommunityIcons name="information-outline" color={colors.lime} size={20} /><Text style={styles.noteText}>Calienta antes de empezar. La técnica manda.</Text></View>
    <Pressable onPress={() => { if (!canStartWorkout) return; startWorkout(); router.push('/workout'); }} style={[styles.start, !canStartWorkout && styles.startDisabled]} disabled={!canStartWorkout}><Text style={styles.startText}>COMENZAR ENTRENAMIENTO</Text><MaterialCommunityIcons name="arrow-right" size={21} color={colors.background} /></Pressable>
  </ScrollView>
  <Modal visible={!!pickerFor} transparent animationType="fade" onRequestClose={() => setPickerFor(null)}>
    <Pressable style={styles.modalBackdrop} onPress={() => setPickerFor(null)}>
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>SUSTITUIR {pickerFor?.name.toUpperCase()}</Text>
        {substituteOptions.length === 0 && <Text style={styles.modalEmpty}>Sin alternativas con tu equipamiento disponible.</Text>}
        <ScrollView>
          {substituteOptions.map((option) => <Pressable key={option.id} style={styles.modalOption} onPress={() => { if (pickerFor) setSubstitute(pickerFor.id, option.id); setPickerFor(null); }}>
            <Text style={styles.modalOptionName}>{option.name}</Text><Text style={styles.modalOptionDetail}>{option.equipment.toUpperCase()}</Text>
          </Pressable>)}
        </ScrollView>
        {pickerFor && substitutions[pickerFor.id] && <Pressable style={styles.modalReset} onPress={() => { clearSubstitute(pickerFor.id); setPickerFor(null); }}><Text style={styles.modalResetText}>VOLVER AL ORIGINAL</Text></Pressable>}
      </View>
    </Pressable>
  </Modal>
  </SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, container: { padding: spacing.lg, gap: spacing.lg }, back: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, backText: { color: colors.text, fontFamily: 'Quantico', fontSize: 12 }, kicker: { color: colors.lime, fontFamily: 'Quantico', fontSize: 12, letterSpacing: 1 }, title: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 38, marginTop: -10 }, subtitle: { color: colors.muted, ...typography.body, marginTop: -10 }, list: { gap: spacing.sm }, exercise: { minHeight: 92, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: radius.sm, padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, number: { width: 34, height: 34, backgroundColor: colors.limeDim, justifyContent: 'center', alignItems: 'center' }, numberText: { color: colors.lime, fontFamily: 'QuanticoBold' }, info: { flex: 1, gap: 6 }, name: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 16 }, detail: { color: colors.muted, fontFamily: 'Quantico', fontSize: 9 }, prescription: { alignItems: 'flex-end' }, sets: { color: colors.lime, fontFamily: 'QuanticoBold', fontSize: 25 }, reps: { color: colors.muted, fontFamily: 'Quantico', fontSize: 8, textAlign: 'right' }, swap: { paddingLeft: spacing.xs }, note: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface }, noteText: { flex: 1, color: colors.muted, fontSize: 13 }, start: { minHeight: 60, backgroundColor: colors.lime, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.sm, borderRadius: radius.sm }, startDisabled: { opacity: 0.4 }, startText: { color: colors.background, fontFamily: 'QuanticoBold', fontSize: 13 }, modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }, modalCard: { maxHeight: '70%', backgroundColor: colors.card, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg, gap: spacing.sm }, modalTitle: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 16 }, modalEmpty: { color: colors.muted, fontFamily: 'Quantico', fontSize: 12 }, modalOption: { paddingVertical: spacing.sm, borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, modalOptionName: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 14 }, modalOptionDetail: { color: colors.muted, fontFamily: 'Quantico', fontSize: 10 }, modalReset: { marginTop: spacing.sm, alignItems: 'center', paddingVertical: spacing.sm }, modalResetText: { color: colors.error, fontFamily: 'Quantico', fontSize: 12 } });