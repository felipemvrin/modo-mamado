import type { ImageSourcePropType } from 'react-native';

export const muscleGroups = ['Pecho', 'Espalda', 'Bíceps', 'Tríceps', 'Hombros', 'Piernas', 'Core'] as const;

export type MuscleGroup = (typeof muscleGroups)[number];

export const exerciseCategories = ['Pesas libres', 'Máquinas', 'Kettlebell', 'Calistenia', 'Bandas', 'Peso corporal'] as const;
export type ExerciseCategory = (typeof exerciseCategories)[number];

export const equipmentTypes = ['Barra', 'Mancuernas', 'Máquina', 'Polea', 'Kettlebell', 'Bandas', 'Peso corporal', 'Barra paralela'] as const;
export type EquipmentType = (typeof equipmentTypes)[number];

export const difficultyLevels = ['Inicial', 'Intermedio', 'Avanzado'] as const;
export type Difficulty = (typeof difficultyLevels)[number];

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  category: ExerciseCategory;
  equipment: EquipmentType;
  difficulty: Difficulty;
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string;
  mediaUrl?: string;
  mediaSource?: ImageSourcePropType;
};

export type CompletedWorkout = {
  id: string;
  muscleGroups: MuscleGroup[];
  completedAt: string;
  exerciseCount: number;
  setLogs?: SetLog[];
};

export type SetLog = {
  exerciseId: string;
  setIndex: number;
  weight: number;
  reps: number;
};