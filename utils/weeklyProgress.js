import { muscleGroups } from '../types/workout';
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
function startOfWeek(date) {
    const result = new Date(date);
    const day = result.getDay();
    const daysFromMonday = day === 0 ? 6 : day - 1;
    result.setHours(0, 0, 0, 0);
    result.setDate(result.getDate() - daysFromMonday);
    return result;
}
function daysSince(date, now) {
    return Math.max(0, Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000)));
}
export function getWeeklyProgress(history, now = new Date()) {
    const weekStart = startOfWeek(now);
    const workouts = history.filter((workout) => {
        const completedAt = new Date(workout.completedAt);
        return !Number.isNaN(completedAt.getTime()) && completedAt >= weekStart;
    });
    const muscles = muscleGroups.map((muscle) => {
        const muscleWorkouts = workouts.filter((workout) => workout.muscleGroups.includes(muscle));
        const latest = muscleWorkouts.reduce((current, workout) => {
            if (!current)
                return workout;
            return new Date(workout.completedAt).getTime() > new Date(current.completedAt).getTime() ? workout : current;
        }, null);
        const lastTrainedAt = latest?.completedAt ?? null;
        const daysSinceLastTraining = lastTrainedAt ? daysSince(new Date(lastTrainedAt), now) : null;
        return {
            muscle,
            sessions: muscleWorkouts.length,
            lastTrainedAt,
            daysSinceLastTraining,
            status: muscleWorkouts.length > 0 ? 'trained' : 'pending',
        };
    });
    const trainedMuscles = muscles.filter((item) => item.status === 'trained').map((item) => item.muscle);
    const recommendedMuscles = muscles.filter((item) => item.status === 'pending').map((item) => item.muscle);
    return { weekStart, workouts, muscles, trainedMuscles, recommendedMuscles };
}
export function formatRelativeTraining(daysSinceLastTraining) {
    if (daysSinceLastTraining === null)
        return 'PENDIENTE';
    if (daysSinceLastTraining === 0)
        return 'HOY';
    if (daysSinceLastTraining === 1)
        return 'AYER';
    return `HACE ${daysSinceLastTraining} DÍAS`;
}
export { WEEK_IN_MS };
