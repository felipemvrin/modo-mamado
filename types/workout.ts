export const muscleGroups = ['Pecho', 'Espalda', 'Bíceps', 'Tríceps', 'Hombros', 'Piernas', 'Core'] as const;

export type MuscleGroup = (typeof muscleGroups)[number];

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: string;
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string;
  mediaUrl?: string;
};

export type CompletedWorkout = {
  id: string;
  muscleGroup: MuscleGroup;
  completedAt: string;
  exerciseCount: number;
};