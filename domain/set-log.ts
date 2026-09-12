export type ParsedSetLogInput = {
  weight: number;
  reps: number;
};

export function parseSetLogInput(weightInput: string, repsInput: string): ParsedSetLogInput | null {
  const rawWeight = weightInput.trim();
  const rawReps = repsInput.trim();
  const normalizedWeight = rawWeight.replace(',', '.');

  if (rawWeight !== '' && !/^\d+(?:[.,]\d*)?$/.test(rawWeight)) return null;
  if (rawReps !== '' && !/^\d+$/.test(rawReps)) return null;

  const weight = normalizedWeight === '' ? 0 : Number(normalizedWeight);
  const reps = rawReps === '' ? 0 : Number(rawReps);

  if (!Number.isFinite(weight) || weight < 0) return null;
  if (!Number.isInteger(reps) || reps < 0) return null;

  return { weight, reps };
}