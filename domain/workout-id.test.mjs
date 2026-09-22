import test from 'node:test';
import assert from 'node:assert/strict';

import { createWorkoutId } from './workout-id.ts';

test('createWorkoutId keeps ids unique in the same millisecond even with equal random values', () => {
  const first = createWorkoutId(1727030999000, 0.5);
  const second = createWorkoutId(1727030999000, 0.5);

  assert.notEqual(first, second);
});

test('createWorkoutId keeps a non-empty random suffix when random value is zero', () => {
  const id = createWorkoutId(1727030999001, 0);
  const [, , suffix] = id.split('-');

  assert.equal(suffix.length, 8);
  assert.equal(suffix, '00000000');
});

test('createWorkoutId stays unique when clock moves backwards', () => {
  const newer = createWorkoutId(1727030999005, 0.5);
  const older = createWorkoutId(1727030999004, 0.5);
  const [newerTimestamp] = newer.split('-');
  const [olderTimestamp] = older.split('-');

  assert.notEqual(newer, older);
  assert.equal(olderTimestamp, newerTimestamp);
});
