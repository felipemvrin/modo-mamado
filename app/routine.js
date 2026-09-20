import { useState } from 'react';
import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getExerciseById, getExercisesForMuscles, getSubstitutes } from '../data/routines';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { useWorkoutStore } from '../store/workout';
export default function Routine() {
    const { selectedMuscles, startWorkout, availableEquipment, substitutions, setSubstitute, clearSubstitute } = useWorkoutStore();
    const [pickerFor, setPickerFor] = useState(null);
    const [zoomExercise, setZoomExercise] = useState(null);
    const [failedMediaById, setFailedMediaById] = useState({});
    const [removedIds, setRemovedIds] = useState({});
    const markMediaAsFailed = (exerciseId, mediaType) => setFailedMediaById((previous) => ({ ...previous, [exerciseId]: { ...previous[exerciseId], [mediaType]: true } }));
    const removeExercise = (id) => setRemovedIds((current) => ({ ...current, [id]: true }));
    const restoreExercises = () => setRemovedIds({});
    const removedCount = Object.keys(removedIds).length;
    const baseExercises = getExercisesForMuscles(selectedMuscles).filter((item) => !removedIds[item.id]);
    const exercises = baseExercises.map((item) => (substitutions[item.id] ? getExerciseById(substitutions[item.id]) ?? item : item));
    const canStartWorkout = exercises.length > 0;
    const substituteOptions = pickerFor ? getSubstitutes(pickerFor, availableEquipment) : [];
    const zoomCanShowLocal = !!zoomExercise?.mediaSource && !failedMediaById[zoomExercise.id]?.local;
    const zoomCanShowRemote = !!zoomExercise?.mediaUrl && !failedMediaById[zoomExercise.id]?.remote;
    const zoomImageType = zoomCanShowLocal ? 'local' : zoomCanShowRemote ? 'remote' : null;
    const zoomImageSource = zoomImageType === 'local' ? zoomExercise?.mediaSource : zoomImageType === 'remote' ? { uri: zoomExercise?.mediaUrl } : null;
    return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Pressable onPress={() => router.back()} style={styles.back}><MaterialCommunityIcons name="arrow-left" size={22} color={colors.text}/><Text style={styles.backText}>VOLVER</Text></Pressable>
    <Text style={styles.kicker}>RUTINA SUGERIDA / {exercises.length} EJERCICIOS</Text><Text style={styles.title}>{selectedMuscles.join(' + ').toUpperCase()}</Text><Text style={styles.subtitle}>Hoy no toca pensar. Solo ejecutar.</Text>
    {removedCount > 0 && <Pressable onPress={restoreExercises} style={styles.restore}><MaterialCommunityIcons name="undo" size={16} color={colors.lime}/><Text style={styles.restoreText}>RESTAURAR {removedCount} EJERCICIO{removedCount === 1 ? '' : 'S'} ELIMINADO{removedCount === 1 ? '' : 'S'}</Text></Pressable>}
    <View style={styles.list}>{exercises.map((item, index) => {
            const original = baseExercises[index];
            const isSubstituted = original.id !== item.id;
            const canShowLocal = !!item.mediaSource && !failedMediaById[item.id]?.local;
            const canShowRemote = !!item.mediaUrl && !failedMediaById[item.id]?.remote;
            const imageSource = canShowLocal ? item.mediaSource : canShowRemote ? { uri: item.mediaUrl } : null;
            return <Swipeable key={original.id} overshootRight={false} renderRightActions={() => <Pressable onPress={() => removeExercise(original.id)} style={styles.deleteAction}><MaterialCommunityIcons name="trash-can-outline" size={22} color={colors.background}/><Text style={styles.deleteActionText}>ELIMINAR</Text></Pressable>}>
      <View style={styles.exercise}>
        <Pressable style={styles.thumbnail} disabled={!imageSource} onPress={() => setZoomExercise(item)}>{imageSource ? <Image source={imageSource} style={styles.thumbnailImage} onError={() => setFailedMediaById((previous) => ({ ...previous, [item.id]: canShowLocal ? { ...previous[item.id], local: true } : { ...previous[item.id], remote: true } }))}/> : <MaterialCommunityIcons name="image-off-outline" size={20} color={colors.muted}/>}</Pressable>
        <View style={styles.number}><Text style={styles.numberText}>{String(index + 1).padStart(2, '0')}</Text></View>
        <View style={styles.info}><Text style={styles.name}>{item.name}</Text><Text style={styles.detail}>{item.equipment.toUpperCase()} · {item.restSeconds}s DESCANSO</Text></View>
        <View style={styles.prescription}><Text style={styles.sets}>{item.sets}</Text><Text style={styles.reps}>SERIES · {item.reps} REPS</Text></View>
        <Pressable onPress={() => setPickerFor(original)} style={styles.swap} hitSlop={8}>
          <MaterialCommunityIcons name={isSubstituted ? 'swap-horizontal-bold' : 'swap-horizontal'} size={20} color={isSubstituted ? colors.lime : colors.muted}/>
        </Pressable>
      </View>
      </Swipeable>;
        })}</View>
    {exercises.length === 0 && <Text style={styles.emptyText}>Eliminaste todos los ejercicios. Restaura alguno para poder empezar.</Text>}
    <View style={styles.note}><MaterialCommunityIcons name="information-outline" color={colors.lime} size={20}/><Text style={styles.noteText}>Calienta antes de empezar. La técnica manda. Desliza un ejercicio hacia la izquierda para eliminarlo.</Text></View>
    <Pressable onPress={() => { if (!canStartWorkout)
        return; startWorkout(baseExercises.map((exercise) => exercise.id)); router.push('/workout'); }} style={[styles.start, !canStartWorkout && styles.startDisabled]} disabled={!canStartWorkout}><Text style={styles.startText}>COMENZAR ENTRENAMIENTO</Text><MaterialCommunityIcons name="arrow-right" size={21} color={colors.background}/></Pressable>
  </ScrollView>
  <Modal visible={!!pickerFor} transparent animationType="fade" onRequestClose={() => setPickerFor(null)}>
    <Pressable style={styles.modalBackdrop} onPress={() => setPickerFor(null)}>
      <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
        <Text style={styles.modalTitle}>SUSTITUIR {pickerFor?.name.toUpperCase()}</Text>
        {substituteOptions.length === 0 && <Text style={styles.modalEmpty}>Sin alternativas con tu equipamiento disponible.</Text>}
        <ScrollView>
          {substituteOptions.map((option) => <Pressable key={option.id} style={styles.modalOption} onPress={() => { if (pickerFor)
            setSubstitute(pickerFor.id, option.id); setPickerFor(null); }}>
            <Text style={styles.modalOptionName}>{option.name}</Text><Text style={styles.modalOptionDetail}>{option.equipment.toUpperCase()}</Text>
          </Pressable>)}
        </ScrollView>
        {pickerFor && substitutions[pickerFor.id] && <Pressable style={styles.modalReset} onPress={() => { clearSubstitute(pickerFor.id); setPickerFor(null); }}><Text style={styles.modalResetText}>VOLVER AL ORIGINAL</Text></Pressable>}
      </Pressable>
    </Pressable>
  </Modal>
  <Modal visible={!!zoomExercise} transparent animationType="fade" onRequestClose={() => setZoomExercise(null)}>
    <Pressable style={styles.zoomBackdrop} onPress={() => setZoomExercise(null)}>
      <Pressable style={styles.zoomContent} onPress={(event) => event.stopPropagation()}>
        {zoomImageSource && <Image source={zoomImageSource} style={styles.zoomImage} resizeMode="contain" onError={() => { if (!zoomExercise || !zoomImageType)
        return; markMediaAsFailed(zoomExercise.id, zoomImageType); }}/>}
        <Text style={styles.zoomName}>{zoomExercise?.name.toUpperCase()}</Text>
        <Pressable style={styles.zoomClose} onPress={() => setZoomExercise(null)}><MaterialCommunityIcons name="close" size={26} color={colors.text}/></Pressable>
      </Pressable>
    </Pressable>
  </Modal>
  </SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, container: { padding: spacing.lg, gap: spacing.lg }, back: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, backText: { color: colors.text, fontFamily: 'Quantico', fontSize: 12 }, kicker: { color: colors.lime, fontFamily: 'Quantico', fontSize: 12, letterSpacing: 1 }, title: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 38, marginTop: -10 }, subtitle: { color: colors.muted, ...typography.body, marginTop: -10 }, list: { gap: spacing.sm }, exercise: { minHeight: 92, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: radius.sm, padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, thumbnail: { width: 44, height: 44, borderRadius: radius.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }, thumbnailImage: { width: '100%', height: '100%' }, number: { width: 34, height: 34, backgroundColor: colors.limeDim, justifyContent: 'center', alignItems: 'center' }, numberText: { color: colors.lime, fontFamily: 'QuanticoBold' }, info: { flex: 1, gap: 6 }, name: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 16 }, detail: { color: colors.muted, fontFamily: 'Quantico', fontSize: 9 }, prescription: { alignItems: 'flex-end' }, sets: { color: colors.lime, fontFamily: 'QuanticoBold', fontSize: 25 }, reps: { color: colors.muted, fontFamily: 'Quantico', fontSize: 8, textAlign: 'right' }, swap: { paddingLeft: spacing.xs }, note: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface }, noteText: { flex: 1, color: colors.muted, fontSize: 13 }, start: { minHeight: 60, backgroundColor: colors.lime, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.sm, borderRadius: radius.sm }, startDisabled: { opacity: 0.4 }, startText: { color: colors.background, fontFamily: 'QuanticoBold', fontSize: 13 }, modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }, modalCard: { maxHeight: '70%', backgroundColor: colors.card, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg, gap: spacing.sm }, modalTitle: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 16 }, modalEmpty: { color: colors.muted, fontFamily: 'Quantico', fontSize: 12 }, modalOption: { paddingVertical: spacing.sm, borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, modalOptionName: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 14 }, modalOptionDetail: { color: colors.muted, fontFamily: 'Quantico', fontSize: 10 }, modalReset: { marginTop: spacing.sm, alignItems: 'center', paddingVertical: spacing.sm }, modalResetText: { color: colors.error, fontFamily: 'Quantico', fontSize: 12 }, deleteAction: { width: 88, height: '100%', backgroundColor: colors.error, justifyContent: 'center', alignItems: 'center', gap: 4, borderRadius: radius.sm }, deleteActionText: { color: colors.background, fontFamily: 'QuanticoBold', fontSize: 10 }, restore: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, alignSelf: 'flex-start' }, restoreText: { color: colors.lime, fontFamily: 'Quantico', fontSize: 11 }, emptyText: { color: colors.muted, fontFamily: 'Quantico', fontSize: 12, textAlign: 'center' }, zoomBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center', padding: spacing.lg }, zoomContent: { width: '100%', alignItems: 'center', gap: spacing.md }, zoomImage: { width: '100%', height: '70%' }, zoomName: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 18, textAlign: 'center' }, zoomClose: { position: 'absolute', top: spacing.xl, right: spacing.lg, padding: spacing.sm } });
