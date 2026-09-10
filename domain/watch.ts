import type { SessionSnapshot } from './session';

export type WatchSessionPayload = {
  selectedMuscles: string[];
  phase: SessionSnapshot['phase'];
  currentExerciseId: string | null;
  currentExerciseName: string | null;
  nextExerciseName: string | null;
  completedSetCount: number;
  totalSetCount: number;
  remainingRestSeconds: number | null;
  progressRatio: number;
  isLastSet: boolean;
};

export function buildWatchSessionPayload(snapshot: SessionSnapshot): WatchSessionPayload {
  return {
    selectedMuscles: snapshot.selectedMuscles,
    phase: snapshot.phase,
    currentExerciseId: snapshot.currentExercise?.id ?? null,
    currentExerciseName: snapshot.currentExercise?.name ?? null,
    nextExerciseName: snapshot.nextExercise?.name ?? null,
    completedSetCount: snapshot.completedSetCount,
    totalSetCount: snapshot.totalSetCount,
    remainingRestSeconds: snapshot.remainingRestSeconds,
    progressRatio: snapshot.progressRatio,
    isLastSet: snapshot.isLastSet,
  };
}
