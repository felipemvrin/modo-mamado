import { create } from 'zustand';
import { defaultMuscle, getExercisesForMuscles } from '../data/routines';
import { getWorkouts, initializeDatabase, saveWorkout } from '../database/workouts';
import { equipmentTypes } from '../types/workout';
export const useWorkoutStore = create((set, get) => ({
    selectedMuscles: [defaultMuscle],
    activeWorkout: null,
    activeExerciseIds: null,
    completedSets: [],
    history: [],
    availableEquipment: [...equipmentTypes],
    substitutions: {},
    toggleMuscle: (muscle) => set((state) => {
        if (state.selectedMuscles.includes(muscle)) {
            if (state.selectedMuscles.length === 1)
                return state;
            return { selectedMuscles: state.selectedMuscles.filter((item) => item !== muscle) };
        }
        return { selectedMuscles: [...state.selectedMuscles, muscle] };
    }),
    startWorkout: (exerciseIds) => set(() => {
        const activeWorkout = get().selectedMuscles;
        return {
            activeWorkout,
            activeExerciseIds: exerciseIds ?? getExercisesForMuscles(activeWorkout).map((exercise) => exercise.id),
            completedSets: [],
        };
    }),
    completeSet: (exerciseIndex, setIndex) => set((state) => ({ completedSets: state.completedSets.includes(exerciseIndex * 100 + setIndex) ? state.completedSets : [...state.completedSets, exerciseIndex * 100 + setIndex] })),
    finishWorkout: () => {
        const { activeWorkout, activeExerciseIds } = get();
        if (!activeWorkout?.length)
            return;
        const workout = {
            id: `${Date.now()}`,
            muscleGroups: activeWorkout,
            completedAt: new Date().toISOString(),
            exerciseCount: activeExerciseIds?.length ?? getExercisesForMuscles(activeWorkout).length,
        };
        saveWorkout(workout);
        set({ activeWorkout: null, activeExerciseIds: null, history: [workout, ...get().history] });
    },
    loadHistory: () => {
        try {
            initializeDatabase();
            set({ history: getWorkouts() });
        }
        catch {
            set({ history: [] });
        }
    },
    toggleEquipment: (equipment) => set((state) => {
        if (state.availableEquipment.includes(equipment)) {
            if (state.availableEquipment.length === 1)
                return state;
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
