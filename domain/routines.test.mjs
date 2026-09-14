import test from 'node:test';
import assert from 'node:assert/strict';

import { allExercises, getExerciseById, getSubstitutes, routines } from '../data/routines.ts';
import { muscleGroups } from '../types/workout.ts';

test('exercise catalog keeps 12 exercises per muscle group and 84 total', () => {
  for (const muscle of muscleGroups) {
    assert.equal(routines[muscle].length, 12, `${muscle} should have 12 exercises`);
  }

  assert.equal(allExercises.length, 84);
});

test('exercise catalog keeps unique ids across all exercises', () => {
  const unique = new Set(allExercises.map((item) => item.id));
  assert.equal(unique.size, allExercises.length);
});

test('bench press has same-muscle substitutes with different equipment, including polea', () => {
  const benchPress = getExerciseById('bench-press');
  assert.ok(benchPress);

  const substitutes = getSubstitutes(benchPress);
  assert.ok(substitutes.length > 0);
  assert.ok(substitutes.every((item) => item.muscleGroup === benchPress.muscleGroup));
  assert.ok(substitutes.every((item) => item.id !== benchPress.id));
  assert.ok(substitutes.every((item) => item.equipment !== benchPress.equipment));
  assert.ok(substitutes.some((item) => item.equipment === 'Polea'));
});

test('exercise media stays explicit when there is no trustworthy match yet', () => {
  const placeholderOnly = [
    'overhead-db-extension',
    'kickback',
    'overhead-cable-extension',
    'reverse-pec-deck',
    'woodchopper',
    'dead-bug',
  ];
  const localAssetOnlyInNode = [
    'band-press',
    'band-curl',
    'band-pushdown',
    'kettlebell-press',
    'pike-pushup',
  ];

  const withoutMedia = allExercises
    .filter((item) => !item.mediaUrl && !item.mediaSource)
    .map((item) => item.id)
    .sort();

  assert.deepEqual(withoutMedia, [...placeholderOnly, ...localAssetOnlyInNode].sort());
});
