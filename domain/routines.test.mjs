import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../data/routines.ts', import.meta.url), 'utf8');
const muscleGroups = ['Pecho', 'Espalda', 'Bíceps', 'Tríceps', 'Hombros', 'Piernas', 'Core'];

function sectionFor(muscle) {
  const escaped = muscle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}: \\[(.*?)\\n  \\],`, 's'));
  assert.ok(match, `missing section for ${muscle}`);
  return match[1];
}

test('exercise catalog keeps 12 exercises per muscle group and 84 total', () => {
  const exerciseCalls = source.match(/\bexercise\(/g) ?? [];
  assert.equal(exerciseCalls.length, 84);

  for (const muscle of muscleGroups) {
    const section = sectionFor(muscle);
    const count = (section.match(/\bexercise\(/g) ?? []).length;
    assert.equal(count, 12, `${muscle} should have 12 exercises`);
  }
});

test('exercise catalog keeps unique ids across all exercises', () => {
  const ids = [...source.matchAll(/exercise\('([^']+)'/g)].map((match) => match[1]);
  const unique = new Set(ids);

  assert.equal(ids.length, 84);
  assert.equal(unique.size, ids.length);
});

test('bench press has substitutes with different equipment, including polea', () => {
  const pecho = sectionFor('Pecho');
  assert.match(pecho, /exercise\('bench-press'.*?'Barra'/s);
  assert.match(pecho, /exercise\('[^']+'.*?'Polea'/s);
});
