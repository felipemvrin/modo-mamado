import { create } from 'zustand';
import { defaultMuscle, getExercisesForMuscles } from '../data/routines';
import { getWorkouts, initializeDatabase, saveWorkout } from '../database/workouts';
import { CompletedWorkout, MuscleGroup } from '../types/workout';

type WorkoutState = {
  selectedMuscles: MuscleGroup[];
  activeWorkout: MuscleGroup[] | null;
  completedSets: number[];
  history: CompletedWorkout[];
  toggleMuscle: (muscle: MuscleGroup) => void;
  startWorkout: () => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  finishWorkout: () => void;
  loadHistory: () => void;
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  selectedMuscles: [defaultMuscle],
  activeWorkout: null,
  completedSets: [],
  history: [],
  toggleMuscle: (muscle) => set((state) => ({ selectedMuscles: state.selectedMuscles.includes(muscle) ? state.selectedMuscles.filter((item) => item !== muscle) : [...state.selectedMuscles, muscle] })),
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
}));