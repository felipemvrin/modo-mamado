export function buildWatchSessionPayload(snapshot) {
    const currentSetNumber = snapshot.currentExercise
        ? Math.min(snapshot.currentExercise.sets, Math.max(0, snapshot.setIndex + 1))
        : 0;
    return {
        selectedMuscles: snapshot.selectedMuscles,
        totalExerciseCount: snapshot.totalExerciseCount,
        phase: snapshot.phase,
        currentExerciseId: snapshot.currentExercise?.id ?? null,
        currentExerciseName: snapshot.currentExercise?.name ?? null,
        nextExerciseName: snapshot.nextExercise?.name ?? null,
        currentSetNumber,
        completedSetCount: snapshot.completedSetCount,
        totalSetCount: snapshot.totalSetCount,
        remainingRestSeconds: snapshot.remainingRestSeconds,
        progressRatio: snapshot.progressRatio,
        isLastSet: snapshot.isLastSet,
        isFinished: snapshot.phase === 'finished',
    };
}
