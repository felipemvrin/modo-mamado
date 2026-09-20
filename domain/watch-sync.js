export const WATCH_SESSION_SCHEMA_VERSION = 1;
export function serializeWatchSessionPayload(payload) {
    const message = {
        version: WATCH_SESSION_SCHEMA_VERSION,
        type: 'session.snapshot',
        payload,
    };
    return JSON.stringify(message);
}
export function parseWatchSessionPayload(serialized) {
    try {
        const message = JSON.parse(serialized);
        if (!isWatchSessionMessage(message))
            return null;
        return message.payload;
    }
    catch {
        return null;
    }
}
function isWatchSessionMessage(value) {
    if (!value || typeof value !== 'object')
        return false;
    const message = value;
    return message.version === WATCH_SESSION_SCHEMA_VERSION
        && message.type === 'session.snapshot'
        && isWatchSessionPayload(message.payload);
}
function isWatchSessionPayload(value) {
    if (!value || typeof value !== 'object')
        return false;
    const payload = value;
    const hasCurrentExerciseId = typeof payload.currentExerciseId === 'string';
    const hasCurrentExerciseName = typeof payload.currentExerciseName === 'string';
    const hasCurrentExercise = hasCurrentExerciseId && hasCurrentExerciseName;
    return Array.isArray(payload.selectedMuscles)
        && payload.selectedMuscles.every((muscle) => typeof muscle === 'string')
        && isNonNegativeInteger(payload.totalExerciseCount)
        && typeof payload.phase === 'string'
        && ['ready', 'resting', 'finished'].includes(payload.phase)
        && (hasCurrentExerciseId || payload.currentExerciseId === null)
        && (hasCurrentExerciseName || payload.currentExerciseName === null)
        && hasCurrentExerciseId === hasCurrentExerciseName
        && (typeof payload.nextExerciseName === 'string' || payload.nextExerciseName === null)
        && (payload.nextExerciseName === null || hasCurrentExercise)
        && isNonNegativeInteger(payload.currentSetNumber)
        && isNonNegativeInteger(payload.completedSetCount)
        && isNonNegativeInteger(payload.totalSetCount)
        && payload.completedSetCount <= payload.totalSetCount
        && (isNonNegativeInteger(payload.remainingRestSeconds) || payload.remainingRestSeconds === null)
        && isProgressRatio(payload.progressRatio)
        && typeof payload.isLastSet === 'boolean'
        && typeof payload.isFinished === 'boolean'
        && payload.isFinished === (payload.phase === 'finished')
        && (hasCurrentExercise || payload.currentSetNumber === 0);
}
function isNonNegativeInteger(value) {
    return Number.isInteger(value) && typeof value === 'number' && value >= 0;
}
function isProgressRatio(value) {
    return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
}
