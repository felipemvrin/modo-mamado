import { create } from 'zustand';
import { defaultMuscle, getExercisesForMuscles } from '../data/routines';
import { getWorkouts, initializeDatabase, saveWorkout } from '../database/workouts';
import { CompletedWorkout, EquipmentType, equipmentTypes, MuscleGroup, SetLog } from '../types/workout';

type WorkoutState = {
  selectedMuscles: MuscleGroup[];
  activeWorkout: MuscleGroup[] | null;
  completedSets: number[];
  setLogs: Record<string, SetLog>;
  history: CompletedWorkout[];
  availableEquipment: EquipmentType[];
  substitutions: Record<string, string>;
  toggleMuscle: (muscle: MuscleGroup) => void;
  startWorkout: () => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  logSet: (exerciseIndex: number, setIndex: number, exerciseId: string, weight: number, reps: number) => void;
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
  setLogs: {},
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
  startWorkout: () => set({ activeWorkout: get().selectedMuscles, completedSets: [], setLogs: {} }),
  completeSet: (exerciseIndex, setIndex) => set((state) => ({ completedSets: state.completedSets.includes(exerciseIndex * 100 + setIndex) ? state.completedSets : [...state.completedSets, exerciseIndex * 100 + setIndex] })),
  logSet: (exerciseIndex, setIndex, exerciseId, weight, reps) => set((state) => ({ setLogs: { ...state.setLogs, [`${exerciseIndex}-${setIndex}`]: { exerciseId, setIndex, weight, reps } } })),
  finishWorkout: () => {
    const { activeWorkout, setLogs } = get();
    if (!activeWorkout?.length) return;
    const workout: CompletedWorkout = { id: `${Date.now()}`, muscleGroups: activeWorkout, completedAt: new Date().toISOString(), exerciseCount: getExercisesForMuscles(activeWorkout).length, setLogs: Object.values(setLogs) };
    saveWorkout(workout);
    set({ activeWorkout: null, setLogs: {}, history: [workout, ...get().history] });
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