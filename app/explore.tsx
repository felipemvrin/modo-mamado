import { useMemo, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { allExercises } from '../data/routines';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { difficultyLevels, equipmentTypes, Exercise, exerciseCategories, muscleGroups } from '../types/workout';

type FilterGroup<T extends string> = { label: string; values: readonly T[]; selected: T | null; onSelect: (value: T | null) => void };

export default function Explore() {
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
        {filtered.map((item: Exercise) => <View key={item.id} style={styles.card}>
          <View style={styles.thumbnail}>{item.mediaUrl && !failedImages.includes(item.id)
            ? <Image source={{ uri: item.mediaUrl }} style={styles.thumbnailImage} onError={() => setFailedImages((current) => (current.includes(item.id) ? current : [...current, item.id]))} />
            : <MaterialCommunityIcons name="image-off-outline" size={22} color={colors.muted} />}</View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{item.name.toUpperCase()}</Text>
            <Text style={styles.cardMeta}>{item.muscleGroup.toUpperCase()} · {item.equipment.toUpperCase()} · {item.difficulty.toUpperCase()}</Text>
          </View>
        </View>)}
        {filtered.length === 0 && <Text style={styles.emptyText}>Sin resultados para estos filtros.</Text>}
      </View>
    </ScrollView>
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
});
