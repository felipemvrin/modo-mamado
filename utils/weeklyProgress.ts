import { CompletedWorkout, MuscleGroup, muscleGroups } from '../types/workout';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export type MuscleProgress = {
  muscle: MuscleGroup;
  sessions: number;
  lastTrainedAt: string | null;
  daysSinceLastTraining: number | null;
  status: 'trained' | 'ready' | 'pending';
};

export type WeeklyProgress = {
  weekStart: Date;
  workouts: CompletedWorkout[];
  muscles: MuscleProgress[];
  trainedMuscles: MuscleGroup[];
  recommendedMuscles: MuscleGroup[];
};

function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - daysFromMonday);
  return result;
}

function daysSince(date: Date, now: Date): number {
  return Math.max(0, Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
}

export function getWeeklyProgress(history: CompletedWorkout[], now = new Date()): WeeklyProgress {
  const weekStart = startOfWeek(now);
  const workouts = history.filter((workout) => new Date(workout.completedAt) >= weekStart);
  const muscles = muscleGroups.map((muscle): MuscleProgress => {
    const muscleWorkouts = workouts.filter((workout) => workout.muscleGroups.includes(muscle));
    const latest = muscleWorkouts[0];
    const lastTrainedAt = latest?.completedAt ?? null;
    const daysSinceLastTraining = lastTrainedAt ? daysSince(new Date(lastTrainedAt), now) : null;
    return {
      muscle,
      sessions: muscleWorkouts.length,
      lastTrainedAt,
      daysSinceLastTraining,
      status: muscleWorkouts.length > 0 ? 'trained' : 'pending',
    };
  });
  const trainedMuscles = muscles.filter((item) => item.status === 'trained').map((item) => item.muscle);
  const recommendedMuscles = muscles.filter((item) => item.status === 'pending').map((item) => item.muscle);
  return { weekStart, workouts, muscles, trainedMuscles, recommendedMuscles };
}

export function formatRelativeTraining(daysSinceLastTraining: number | null): string {
  if (daysSinceLastTraining === null) return 'PENDIENTE';
  if (daysSinceLastTraining === 0) return 'HOY';
  if (daysSinceLastTraining === 1) return 'AYER';
  return `HACE ${daysSinceLastTraining} DÍAS`;
}

export { WEEK_IN_MS };
