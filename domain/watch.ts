import type { SessionSnapshot } from './session';

export type WatchSessionPayload = {
  selectedMuscles: string[];
  totalExerciseCount: number;
  phase: SessionSnapshot['phase'];
  currentExerciseId: string | null;
  currentExerciseName: string | null;
  nextExerciseName: string | null;
  currentSetNumber: number;
  completedSetCount: number;
  totalSetCount: number;
  remainingRestSeconds: number | null;
  progressRatio: number;
  isLastSet: boolean;
  isFinished: boolean;
};

export function buildWatchSessionPayload(snapshot: SessionSnapshot): WatchSessionPayload {
  return {
    selectedMuscles: snapshot.selectedMuscles,
    totalExerciseCount: snapshot.totalExerciseCount,
    phase: snapshot.phase,
    currentExerciseId: snapshot.currentExercise?.id ?? null,
    currentExerciseName: snapshot.currentExercise?.name ?? null,
    nextExerciseName: snapshot.nextExercise?.name ?? null,
    currentSetNumber: snapshot.currentExercise ? snapshot.setIndex + 1 : 0,
    completedSetCount: snapshot.completedSetCount,
    totalSetCount: snapshot.totalSetCount,
    remainingRestSeconds: snapshot.remainingRestSeconds,
    progressRatio: snapshot.progressRatio,
    isLastSet: snapshot.isLastSet,
    isFinished: snapshot.phase === 'finished',
  };
}
