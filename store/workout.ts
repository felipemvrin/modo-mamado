import { create } from 'zustand';
import { defaultMuscle, routines } from '../data/routines';
import { getWorkouts, initializeDatabase, saveWorkout } from '../database/workouts';
import { CompletedWorkout, MuscleGroup } from '../types/workout';

type WorkoutState = {
  selectedMuscle: MuscleGroup;
  activeWorkout: MuscleGroup | null;
  completedSets: number[];
  history: CompletedWorkout[];
  selectMuscle: (muscle: MuscleGroup) => void;
  startWorkout: () => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  finishWorkout: () => void;
  loadHistory: () => void;
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  selectedMuscle: defaultMuscle,
  activeWorkout: null,
  completedSets: [],
  history: [],
  selectMuscle: (selectedMuscle) => set({ selectedMuscle }),
  startWorkout: () => set({ activeWorkout: get().selectedMuscle, completedSets: [] }),
  completeSet: (exerciseIndex, setIndex) => set((state) => ({ completedSets: state.completedSets.includes(exerciseIndex * 100 + setIndex) ? state.completedSets : [...state.completedSets, exerciseIndex * 100 + setIndex] })),
  finishWorkout: () => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;
    const workout: CompletedWorkout = { id: `${Date.now()}`, muscleGroup: activeWorkout, completedAt: new Date().toISOString(), exerciseCount: routines[activeWorkout].length };
    saveWorkout(workout);
    set({ activeWorkout: null, history: [workout, ...get().history] });
  },
  loadHistory: () => {
    initializeDatabase();
    set({ history: getWorkouts() });
  },
}));