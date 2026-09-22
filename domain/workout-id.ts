const RANDOM_SUFFIX_LENGTH = 8;

let lastWorkoutIdTimestamp = -1;
let workoutIdSequence = 0;

function randomSuffix(randomValue: number): string {
  if (!Number.isFinite(randomValue)) return '0'.repeat(RANDOM_SUFFIX_LENGTH);
  const bounded = Math.max(0, Math.min(randomValue, 0.9999999999999999));
  return bounded.toString(36).slice(2, 2 + RANDOM_SUFFIX_LENGTH).padEnd(RANDOM_SUFFIX_LENGTH, '0');
}

export function createWorkoutId(now = Date.now(), randomValue = Math.random()): string {
  const effectiveNow = now > lastWorkoutIdTimestamp ? now : lastWorkoutIdTimestamp;

  if (effectiveNow === lastWorkoutIdTimestamp) {
    workoutIdSequence += 1;
  } else {
    lastWorkoutIdTimestamp = effectiveNow;
    workoutIdSequence = 0;
  }

  return `${effectiveNow}-${workoutIdSequence.toString(36)}-${randomSuffix(randomValue)}`;
}
