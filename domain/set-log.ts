export type ParsedSetLogInput = {
  weight: number;
  reps: number;
};

export function parseSetLogInput(weightInput: string, repsInput: string): ParsedSetLogInput | null {
  const weight = Number(weightInput.replace(',', '.').trim());
  const reps = Number(repsInput.trim());

  if (!Number.isFinite(weight) || weight < 0) return null;
  if (!Number.isInteger(reps) || reps < 0) return null;

  return { weight, reps };
}