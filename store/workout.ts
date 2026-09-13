import { create } from 'zustand';
import { defaultMuscle, getExercisesForMuscles } from '../data/routines';
import { getWorkouts, initializeDatabase, saveWorkout } from '../database/workouts';
import { CompletedWorkout, EquipmentType, equipmentTypes, MuscleGroup } from '../types/workout';

type WorkoutState = {
  selectedMuscles: MuscleGroup[];
  activeWorkout: MuscleGroup[] | null;
  completedSets: number[];
  history: CompletedWorkout[];
  availableEquipment: EquipmentType[];
  substitutions: Record<string, string>;
  toggleMuscle: (muscle: MuscleGroup) => void;
  startWorkout: () => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  finishWorkout: () => void;
  loadHistory: () => void;
  toggleEquipment: (equipment: EquipmentType) => void;
  setSubstitute: (originalId: string, substituteId: string) => void;
  clearSubstitute: (originalId: string) => void;
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  selectedMuscles: [defaultMuscle],
  activeWorkout: null,
  completedSets: [],
  history: [],
  availableEquipment: [...equipmentTypes],
  substitutions: {},
  toggleMuscle: (muscle) => set((state) => {
    if (state.selectedMuscles.includes(muscle)) {
      if (state.selectedMuscles.length === 1) return state;
      return { selectedMuscles: state.selectedMuscles.filter((item) => item !== muscle) };
    }
    return { selectedMuscles: [...state.selectedMuscles, muscle] };
  }),
  startWorkout: () => set({ activeWorkout: get().selectedMuscles, completedSets: [] }),
  completeSet: (exerciseIndex, setIndex) => set((state) => ({ completedSets: state.completedSets.includes(exerciseIndex * 100 + setIndex) ? state.completedSets : [...state.completedSets, exerciseIndex * 100 + setIndex] })),
  finishWorkout: () => {
    const { activeWorkout } = get();
    if (!activeWorkout?.length) return;
    const workout: CompletedWorkout = { id: `${Date.now()}`, muscleGroups: activeWorkout, completedAt: new Date().toISOString(), exerciseCount: getExercisesForMuscles(activeWorkout).length };
    saveWorkout(workout);
    set({ activeWorkout: null, history: [workout, ...get().history] });
  },
  loadHistory: () => {
    initializeDatabase();
    set({ history: getWorkouts() });
  },
  toggleEquipment: (equipment) => set((state) => {
    if (state.availableEquipment.includes(equipment)) {
      if (state.availableEquipment.length === 1) return state;
      return { availableEquipment: state.availableEquipment.filter((item) => item !== equipment) };
    }
    return { availableEquipment: [...state.availableEquipment, equipment] };
  }),
  setSubstitute: (originalId, substituteId) => set((state) => ({ substitutions: { ...state.substitutions, [originalId]: substituteId } })),
  clearSubstitute: (originalId) => set((state) => {
    const { [originalId]: _removed, ...rest } = state.substitutions;
    return { substitutions: rest };
  }),
}));