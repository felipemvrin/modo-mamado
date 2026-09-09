import { useMemo, useState } from 'react';
import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { allExercises, getExerciseById, getSubstitutes } from '../data/routines';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { useWorkoutStore } from '../store/workout';
import { difficultyLevels, equipmentTypes, Exercise, exerciseCategories, muscleGroups } from '../types/workout';

type FilterGroup<T extends string> = { label: string; values: readonly T[]; selected: T | null; onSelect: (value: T | null) => void };

export default function Explore() {
  const { availableEquipment, substitutions, setSubstitute, clearSubstitute } = useWorkoutStore();
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [search, setSearch] = useState('');
  const [muscleFilter, setMuscleFilter] = useState<(typeof muscleGroups)[number] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<(typeof exerciseCategories)[number] | null>(null);
  const [equipmentFilter, setEquipmentFilter] = useState<(typeof equipmentTypes)[number] | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<(typeof difficultyLevels)[number] | null>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const query = search
      .trim()
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    return allExercises.filter((item) =>
      (!query || item.name
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .includes(query))
      && (!muscleFilter || item.muscleGroup === muscleFilter)
      && (!categoryFilter || item.category === categoryFilter)
      && (!equipmentFilter || item.equipment === equipmentFilter)
      && (!difficultyFilter || item.difficulty === difficultyFilter),
    );
  }, [search, muscleFilter, categoryFilter, equipmentFilter, difficultyFilter]);

  const filterGroups: FilterGroup<string>[] = [
    { label: 'GRUPO MUSCULAR', values: muscleGroups, selected: muscleFilter, onSelect: (value) => setMuscleFilter(value as typeof muscleFilter) },
    { label: 'CATEGORÍA', values: exerciseCategories, selected: categoryFilter, onSelect: (value) => setCategoryFilter(value as typeof categoryFilter) },
    { label: 'EQUIPAMIENTO', values: equipmentTypes, selected: equipmentFilter, onSelect: (value) => setEquipmentFilter(value as typeof equipmentFilter) },
    { label: 'DIFICULTAD', values: difficultyLevels, selected: difficultyFilter, onSelect: (value) => setDifficultyFilter(value as typeof difficultyFilter) },
  ];

  const clearFilters = () => { setSearch(''); setMuscleFilter(null); setCategoryFilter(null); setEquipmentFilter(null); setDifficultyFilter(null); };
  const hasActiveFilters = Boolean(search.trim() || muscleFilter || categoryFilter || equipmentFilter || difficultyFilter);

  return <SafeAreaView style={styles.safe}>
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.back}><MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} /><Text style={styles.backText}>VOLVER</Text></Pressable>
      <Text style={styles.kicker}>CATÁLOGO COMPLETO</Text>
      <Text style={styles.title}>EXPLORAR</Text>
      <TextInput value={search} onChangeText={setSearch} placeholder="Buscar ejercicio..." placeholderTextColor={colors.muted} style={styles.search} />
    </View>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {filterGroups.map((group) => <View key={group.label} style={styles.filterGroup}>
        <Text style={styles.filterLabel}>{group.label}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {group.values.map((value) => {
            const isSelected = group.selected === value;
            return <Pressable key={value} onPress={() => group.onSelect(isSelected ? null : value)} style={[styles.chip, isSelected && styles.chipActive]}>
              <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>{value.toUpperCase()}</Text>
            </Pressable>;
          })}
        </ScrollView>
      </View>)}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{filtered.length} EJERCICIO{filtered.length === 1 ? '' : 'S'}</Text>
        {hasActiveFilters && <Pressable onPress={clearFilters}><Text style={styles.clearText}>LIMPIAR FILTROS</Text></Pressable>}
      </View>
      <View style={styles.list}>
        {filtered.map((item: Exercise) => <Pressable key={item.id} onPress={() => setSelected(item)} style={styles.card}>
          <View style={styles.thumbnail}>{(item.mediaSource || item.mediaUrl) && !failedImages.includes(item.id)
            ? <Image source={item.mediaSource ?? { uri: item.mediaUrl }} style={styles.thumbnailImage} onError={() => setFailedImages((current) => (current.includes(item.id) ? current : [...current, item.id]))} />
            : <MaterialCommunityIcons name="image-off-outline" size={22} color={colors.muted} />}</View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{item.name.toUpperCase()}</Text>
            <Text style={styles.cardMeta}>{item.muscleGroup.toUpperCase()} · {item.equipment.toUpperCase()} · {item.difficulty.toUpperCase()}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.muted} />
        </Pressable>)}
        {filtered.length === 0 && <Text style={styles.emptyText}>Sin resultados para estos filtros.</Text>}
      </View>
    </ScrollView>
    <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
      <Pressable style={styles.modalBackdrop} onPress={() => setSelected(null)}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {selected && (() => {
              const current = substitutions[selected.id] ? getExerciseById(substitutions[selected.id]) ?? selected : selected;
              const substituteOptions = getSubstitutes(selected, availableEquipment);
              const selectedSubstituteId = substitutions[selected.id];
              return <>
                <View style={styles.modalThumbnail}>{(current.mediaSource || current.mediaUrl) && !failedImages.includes(current.id)
                  ? <Image source={current.mediaSource ?? { uri: current.mediaUrl }} style={styles.thumbnailImage} onError={() => setFailedImages((previous) => (previous.includes(current.id) ? previous : [...previous, current.id]))} />
                  : <MaterialCommunityIcons name="image-off-outline" size={32} color={colors.muted} />}</View>
                <Text style={styles.modalTitle}>{current.name.toUpperCase()}</Text>
                <Text style={styles.modalMeta}>{current.muscleGroup.toUpperCase()}{current.secondaryMuscles.length > 0 ? ` + ${current.secondaryMuscles.join(', ').toUpperCase()}` : ''}</Text>
                <Text style={styles.modalMeta}>{current.category.toUpperCase()} · {current.equipment.toUpperCase()} · {current.difficulty.toUpperCase()}</Text>
                <Text style={styles.modalPrescription}>{current.sets} SERIES · {current.reps} REPS · {current.restSeconds}S DESCANSO</Text>
                <Text style={styles.modalInstructions}>{current.instructions}</Text>
                <Text style={styles.modalSection}>SUSTITUTOS DISPONIBLES</Text>
                {substituteOptions.length === 0 && <Text style={styles.modalEmpty}>Sin alternativas con tu equipamiento disponible.</Text>}
                {substituteOptions.map((option) => <Pressable key={option.id} style={styles.modalOption} onPress={() => setSubstitute(selected.id, option.id)}>
                  <Text style={styles.modalOptionName}>{option.name.toUpperCase()}</Text>
                  <Text style={styles.modalOptionDetail}>{option.id === selectedSubstituteId ? `${option.equipment.toUpperCase()} · ACTUAL` : option.equipment.toUpperCase()}</Text>
                </Pressable>)}
                {substitutions[selected.id] && <Pressable style={styles.modalReset} onPress={() => clearSubstitute(selected.id)}><Text style={styles.modalResetText}>VOLVER AL ORIGINAL</Text></Pressable>}
              </>;
            })()}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, paddingBottom: spacing.sm, gap: spacing.sm },
  back: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  backText: { color: colors.text, fontFamily: 'Quantico', fontSize: 12 },
  kicker: { color: colors.lime, fontFamily: 'Quantico', fontSize: 12, letterSpacing: 1 },
  title: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 34, marginTop: -8 },
  search: { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.md, color: colors.text, fontFamily: 'Quantico', backgroundColor: colors.card },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  filterGroup: { gap: spacing.xs },
  filterLabel: { color: colors.muted, fontFamily: 'Quantico', fontSize: 11, letterSpacing: 1 },
  chipRow: { gap: spacing.xs, paddingRight: spacing.md },
  chip: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, backgroundColor: colors.card },
  chipActive: { backgroundColor: colors.lime, borderColor: colors.lime },
  chipText: { color: colors.muted, fontFamily: 'Quantico', fontSize: 10 },
  chipTextActive: { color: colors.background },
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  resultsCount: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 13 },
  clearText: { color: colors.error, fontFamily: 'Quantico', fontSize: 11 },
  list: { gap: spacing.sm },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.sm, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm },
  thumbnail: { width: 52, height: 52, borderRadius: radius.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  thumbnailImage: { width: '100%', height: '100%' },
  cardInfo: { flex: 1, gap: 4 },
  cardName: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 13 },
  cardMeta: { color: colors.muted, fontFamily: 'Quantico', fontSize: 9 },
  emptyText: { color: colors.muted, ...typography.body, textAlign: 'center', marginTop: spacing.xl },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalCard: { maxHeight: '80%', backgroundColor: colors.card, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  modalContent: { padding: spacing.lg, gap: spacing.sm },
  modalThumbnail: { width: 96, height: 96, borderRadius: radius.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', alignSelf: 'center' },
  modalTitle: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 22, textAlign: 'center' },
  modalMeta: { color: colors.muted, fontFamily: 'Quantico', fontSize: 11, textAlign: 'center' },
  modalPrescription: { color: colors.lime, fontFamily: 'QuanticoBold', fontSize: 13, textAlign: 'center', marginTop: spacing.xs },
  modalInstructions: { color: colors.text, fontFamily: 'Quantico', fontSize: 13, marginTop: spacing.sm },
  modalSection: { color: colors.muted, fontFamily: 'Quantico', fontSize: 12, letterSpacing: 1, marginTop: spacing.md },
  modalEmpty: { color: colors.muted, fontFamily: 'Quantico', fontSize: 12 },
  modalOption: { paddingVertical: spacing.sm, borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalOptionName: { color: colors.text, fontFamily: 'QuanticoBold', fontSize: 13 },
  modalOptionDetail: { color: colors.muted, fontFamily: 'Quantico', fontSize: 10 },
  modalReset: { marginTop: spacing.sm, alignItems: 'center', paddingVertical: spacing.sm },
  modalResetText: { color: colors.error, fontFamily: 'Quantico', fontSize: 12 },
});
