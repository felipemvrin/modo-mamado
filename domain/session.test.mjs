import test from 'node:test';
import assert from 'node:assert/strict';

import { buildSessionSnapshot } from './session.ts';
import { buildWatchSessionPayload } from './watch.ts';

const exercises = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    muscleGroup: 'Pecho',
    secondaryMuscles: ['Tríceps'],
    category: 'Pesas libres',
    equipment: 'Barra',
    difficulty: 'Intermedio',
    sets: 3,
    reps: '8-10',
    restSeconds: 90,
    instructions: 'Controla la bajada.',
  },
  {
    id: 'row',
    name: 'Barbell Row',
    muscleGroup: 'Espalda',
    secondaryMuscles: ['Bíceps'],
    category: 'Pesas libres',
    equipment: 'Barra',
    difficulty: 'Intermedio',
    sets: 3,
    reps: '8-10',
    restSeconds: 90,
    instructions: 'Mantén la espalda neutra.',
  },
];

test('buildSessionSnapshot keeps the session ready when rest has already expired', () => {
  const snapshot = buildSessionSnapshot({
    selectedMuscles: ['Pecho'],
    exercises,
    completedSets: [0],
    exerciseIndex: 0,
    setIndex: 1,
    restEndsAt: 1_000,
    restTotalSeconds: 90,
    now: 1_000,
  });

  assert.equal(snapshot.remainingRestSeconds, 0);
  assert.equal(snapshot.phase, 'ready');
});

test('buildSessionSnapshot only marks the workout finished after all sets are completed', () => {
  const snapshot = buildSessionSnapshot({
    selectedMuscles: ['Espalda'],
    exercises: [exercises[1]],
    completedSets: [0, 1, 2],
    exerciseIndex: 0,
    setIndex: 2,
    restEndsAt: null,
    restTotalSeconds: 0,
    now: 1_000,
  });

  assert.equal(snapshot.phase, 'finished');
  assert.equal(snapshot.isLastSet, true);
  assert.equal(snapshot.progressRatio, 1);
});

test('buildSessionSnapshot ignores duplicate and out-of-range completed set ids', () => {
  const snapshot = buildSessionSnapshot({
    selectedMuscles: ['Espalda'],
    exercises: [exercises[1]],
    completedSets: [0, 1, 2, 2, 3],
    exerciseIndex: 0,
    setIndex: 2,
    restEndsAt: null,
    restTotalSeconds: 0,
    now: 1_000,
  });

  assert.equal(snapshot.completedSetCount, 3);
  assert.equal(snapshot.phase, 'finished');
  assert.equal(snapshot.progressRatio, 1);
});

test('buildSessionSnapshot does not finish when invalid entries hide a missing real set', () => {
  const snapshot = buildSessionSnapshot({
    selectedMuscles: ['Espalda'],
    exercises: [exercises[1]],
    completedSets: [0, 1, 3],
    exerciseIndex: 0,
    setIndex: 2,
    restEndsAt: null,
    restTotalSeconds: 0,
    now: 1_000,
  });

  assert.equal(snapshot.completedSetCount, 2);
  assert.equal(snapshot.phase, 'ready');
  assert.equal(snapshot.progressRatio, 2 / 3);
});

test('buildWatchSessionPayload exposes a stable contract for a companion app', () => {
  const snapshot = buildSessionSnapshot({
    selectedMuscles: ['Pecho', 'Espalda'],
    exercises,
    completedSets: [0],
    exerciseIndex: 0,
    setIndex: 1,
    restEndsAt: 1_000,
    restTotalSeconds: 90,
    now: 1_000,
  });

  const payload = buildWatchSessionPayload(snapshot);

  assert.equal(payload.totalExerciseCount, 2);
  assert.equal(payload.currentSetNumber, 2);
  assert.equal(payload.isFinished, false);
  assert.equal(payload.currentExerciseName, 'Bench Press');
  assert.equal(payload.nextExerciseName, 'Barbell Row');
  assert.equal(payload.remainingRestSeconds, 0);
  assert.equal(payload.phase, 'ready');
});
