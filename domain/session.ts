import type { Exercise, MuscleGroup } from '../types/workout';

export type SessionPhase = 'ready' | 'resting' | 'finished';

export type SessionSnapshot = {
  selectedMuscles: MuscleGroup[];
  exerciseIndex: number;
  setIndex: number;
  completedSetCount: number;
  totalSetCount: number;
  phase: SessionPhase;
  restEndsAt: number | null;
  restTotalSeconds: number;
  now: number;
  remainingRestSeconds: number | null;
  currentExercise: Exercise | null;
  nextExercise: Exercise | null;
  isLastSet: boolean;
  progressRatio: number;
};

export function resolveNextSetPosition(
  exercises: Exercise[],
  exerciseIndex: number,
  setIndex: number,
): { exerciseIndex: number; setIndex: number; isFinished: boolean } {
  if (!exercises.length) {
    return { exerciseIndex: 0, setIndex: 0, isFinished: true };
  }

  const currentExercise = exercises[exerciseIndex];
  if (!currentExercise) {
    return { exerciseIndex: 0, setIndex: 0, isFinished: true };
  }

  if (setIndex + 1 < currentExercise.sets) {
    return { exerciseIndex, setIndex: setIndex + 1, isFinished: false };
  }

  if (exerciseIndex + 1 < exercises.length) {
    return { exerciseIndex: exerciseIndex + 1, setIndex: 0, isFinished: false };
  }

  return {
    exerciseIndex: Math.max(0, exercises.length - 1),
    setIndex: Math.max(0, currentExercise.sets - 1),
    isFinished: true,
  };
}

export function buildSessionSnapshot(params: {
  selectedMuscles: MuscleGroup[];
  exercises: Exercise[];
  completedSets: number[];
  exerciseIndex: number;
  setIndex: number;
  restEndsAt: number | null;
  restTotalSeconds: number;
  now: number;
}): SessionSnapshot {
  const currentExercise = params.exercises[params.exerciseIndex] ?? null;
  const totalSetCount = params.exercises.reduce((sum, item) => sum + item.sets, 0);
  const completedSetCount = params.completedSets.length;
  const remainingRestSeconds = params.restEndsAt === null ? null : Math.max(0, Math.ceil((params.restEndsAt - params.now) / 1000));
  const isLastSet = !!currentExercise && params.exerciseIndex === params.exercises.length - 1 && params.setIndex === currentExercise.sets - 1;
  const phase = completedSetCount === totalSetCount && totalSetCount > 0
    ? 'finished'
    : remainingRestSeconds !== null && remainingRestSeconds > 0
      ? 'resting'
      : 'ready';
  const nextExercise = params.exercises[params.exerciseIndex + 1] ?? null;

  return {
    selectedMuscles: params.selectedMuscles,
    exerciseIndex: params.exerciseIndex,
    setIndex: params.setIndex,
    completedSetCount,
    totalSetCount,
    phase,
    restEndsAt: params.restEndsAt,
    restTotalSeconds: params.restTotalSeconds,
    now: params.now,
    remainingRestSeconds,
    currentExercise,
    nextExercise,
    isLastSet,
    progressRatio: totalSetCount === 0 ? 0 : Math.min(1, completedSetCount / totalSetCount),
  };
}

export function describeWorkoutState(snapshot: SessionSnapshot): string {
  if (!snapshot.currentExercise) return 'SIN SESIÓN ACTIVA';

  if (snapshot.phase === 'resting') {
    return `DESCANSO · ${snapshot.currentExercise.name}`;
  }

  return `SERIE ${snapshot.setIndex + 1}/${snapshot.currentExercise.sets} · ${snapshot.currentExercise.name}`;
}
