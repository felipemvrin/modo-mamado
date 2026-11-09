import test from 'node:test';
import assert from 'node:assert/strict';

import { allExercises, getExerciseById, getExercisesForMuscles, getRoutineExercises, getSubstitutes, routines } from '../data/routines.ts';
import { equipmentTypes, muscleGroups } from '../types/workout.ts';

test('exercise catalog keeps 20 exercises per muscle group and 140 total', () => {
  for (const muscle of muscleGroups) {
    assert.equal(routines[muscle].length, 20, `${muscle} should have 20 exercises`);
    assert.ok(new Set(routines[muscle].map((item) => item.equipment)).size >= 6, `${muscle} should offer varied equipment`);
  }

  assert.equal(allExercises.length, 140);
});

test('exercise catalog keeps unique ids across all exercises', () => {
  const unique = new Set(allExercises.map((item) => item.id));
  assert.equal(unique.size, allExercises.length);
});

test('guided workouts include all 20 exercises per selected muscle in catalog order', () => {
  for (const muscle of muscleGroups) {
    const exercises = getExercisesForMuscles([muscle]);
    assert.equal(exercises.length, 20, `${muscle} should include all 20 exercises`);
    assert.deepEqual(exercises, routines[muscle]);
  }

  assert.deepEqual(getExercisesForMuscles(['Core', 'Pecho']), [...routines.Core, ...routines.Pecho]);
  assert.deepEqual(getExercisesForMuscles(muscleGroups), allExercises);
  assert.deepEqual(getExercisesForMuscles([]), []);
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

test('routine with all equipment preserves the full catalog and order', () => {
  const entries = getRoutineExercises(muscleGroups, [...equipmentTypes]);
  assert.deepEqual(entries.map(({ exercise }) => exercise), allExercises);
  assert.ok(entries.every(({ original, exercise }) => original === exercise));
});

test('chest with stability ball has no matches instead of unrelated equipment', () => {
  assert.deepEqual(getRoutineExercises(['Pecho'], ['Pelota de estabilidad']), []);
});

test('stability ball routines only include matching selected muscle groups', () => {
  const entries = getRoutineExercises(['Pecho', 'Piernas', 'Core'], ['Pelota de estabilidad']);
  assert.deepEqual(entries.map(({ exercise }) => exercise.id), ['ball-leg-curl', 'ball-pike']);
  assert.ok(entries.every(({ exercise }) => exercise.equipment === 'Pelota de estabilidad'));
});

test('equipment filters cover single and multiple choices without modifying the catalog', () => {
  for (const muscle of muscleGroups) {
    for (const equipment of equipmentTypes) {
      assert.deepEqual(
        getRoutineExercises([muscle], [equipment]).map(({ exercise }) => exercise),
        routines[muscle].filter((exercise) => exercise.equipment === equipment),
      );
    }
    assert.equal(routines[muscle].length, 20);
  }
  assert.deepEqual(
    getRoutineExercises(['Core', 'Pecho'], ['Mancuernas', 'Polea']).map(({ exercise }) => exercise),
    [...routines.Core, ...routines.Pecho].filter((exercise) => ['Mancuernas', 'Polea'].includes(exercise.equipment)),
  );
  assert.deepEqual(getRoutineExercises(['Pecho'], []), []);
  assert.deepEqual(getRoutineExercises([], [...equipmentTypes]), []);
});

test('routine resolves compatible substitutes before filtering and keeps original row ids', () => {
  const entries = getRoutineExercises(['Pecho'], ['Polea'], { 'bench-press': 'cable-chest-press' });
  const substituted = entries.find(({ original }) => original.id === 'bench-press');
  assert.equal(substituted?.exercise.id, 'cable-chest-press');
  assert.ok(entries.every(({ exercise }) => exercise.equipment === 'Polea'));
});

test('stale or invalid substitutes cannot bypass the equipment or muscle filters', () => {
  const substitutions = { 'bench-press': 'db-bench-press' };
  assert.deepEqual(
    getRoutineExercises(['Pecho'], ['Barra'], substitutions).map(({ exercise }) => exercise),
    routines.Pecho.filter((exercise) => exercise.equipment === 'Barra'),
  );
  assert.deepEqual(getRoutineExercises(['Pecho'], ['Pelota de estabilidad'], substitutions), []);
  for (const substituteId of ['unknown-exercise', 'ball-pike']) {
    assert.deepEqual(
      getRoutineExercises(['Pecho'], ['Pelota de estabilidad'], { 'bench-press': substituteId }),
      [],
    );
  }
});

test('exercise media stays explicit when there is no trustworthy match yet', () => {
  const localAssetBacked = [
    'band-press',
    'band-curl',
    'band-pushdown',
    'kettlebell-press',
    'pike-pushup',
    'woodchopper',
  ];

  const withLocalAsset = allExercises
    .filter((item) => item.mediaAssetId)
    .map((item) => item.id)
    .sort();
  assert.deepEqual(withLocalAsset, localAssetBacked.sort());

  const withoutMedia = allExercises
    .filter((item) => !item.mediaUrl && !item.mediaAssetId)
    .map((item) => item.id)
    .sort();

  assert.deepEqual(withoutMedia, []);
});

test('plank variants keep the official main-pose image URLs', () => {
  assert.equal(getExerciseById('plank')?.mediaUrl, 'https://exercise-dataset.com/images/flat/plank-main.webp');
  assert.equal(getExerciseById('side-plank')?.mediaUrl, 'https://exercise-dataset.com/images/flat/side-plank-main.webp');
});
