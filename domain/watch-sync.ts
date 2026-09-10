import type { WatchSessionPayload } from './watch';

export const WATCH_SESSION_SCHEMA_VERSION = 1 as const;

export type WatchSessionMessage = {
  version: typeof WATCH_SESSION_SCHEMA_VERSION;
  type: 'session.snapshot';
  payload: WatchSessionPayload;
};

export function serializeWatchSessionPayload(payload: WatchSessionPayload): string {
  const message: WatchSessionMessage = {
    version: WATCH_SESSION_SCHEMA_VERSION,
    type: 'session.snapshot',
    payload,
  };

  return JSON.stringify(message);
}

export function parseWatchSessionPayload(serialized: string): WatchSessionPayload | null {
  try {
    const message: unknown = JSON.parse(serialized);
    if (!isWatchSessionMessage(message)) return null;
    return message.payload;
  } catch {
    return null;
  }
}

function isWatchSessionMessage(value: unknown): value is WatchSessionMessage {
  if (!value || typeof value !== 'object') return false;

  const message = value as Partial<WatchSessionMessage>;
  return message.version === WATCH_SESSION_SCHEMA_VERSION
    && message.type === 'session.snapshot'
    && isWatchSessionPayload(message.payload);
}

function isWatchSessionPayload(value: unknown): value is WatchSessionPayload {
  if (!value || typeof value !== 'object') return false;

  const payload = value as Partial<WatchSessionPayload>;
  return Array.isArray(payload.selectedMuscles)
    && payload.selectedMuscles.every((muscle) => typeof muscle === 'string')
    && typeof payload.totalExerciseCount === 'number'
    && typeof payload.phase === 'string'
    && ['ready', 'resting', 'finished'].includes(payload.phase)
    && (typeof payload.currentExerciseId === 'string' || payload.currentExerciseId === null)
    && (typeof payload.currentExerciseName === 'string' || payload.currentExerciseName === null)
    && (typeof payload.nextExerciseName === 'string' || payload.nextExerciseName === null)
    && typeof payload.currentSetNumber === 'number'
    && typeof payload.completedSetCount === 'number'
    && typeof payload.totalSetCount === 'number'
    && (typeof payload.remainingRestSeconds === 'number' || payload.remainingRestSeconds === null)
    && typeof payload.progressRatio === 'number'
    && typeof payload.isLastSet === 'boolean'
    && typeof payload.isFinished === 'boolean';
}