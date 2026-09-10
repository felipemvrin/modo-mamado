import test from 'node:test';
import assert from 'node:assert/strict';

import { buildSessionSnapshot } from './session.ts';

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
