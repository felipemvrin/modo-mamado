import * as SQLite from 'expo-sqlite';
let database = null;
let isInitialized = false;
function getDatabase() {
    database ??= SQLite.openDatabaseSync('modo-mamado.db');
    return database;
}
function ensureDatabaseInitialized() {
    if (isInitialized)
        return;
    getDatabase().execSync('CREATE TABLE IF NOT EXISTS workouts (id TEXT PRIMARY KEY NOT NULL, muscle_group TEXT NOT NULL, completed_at TEXT NOT NULL, exercise_count INTEGER NOT NULL);');
    isInitialized = true;
}
export function initializeDatabase() {
    ensureDatabaseInitialized();
}
export function saveWorkout(workout) {
    ensureDatabaseInitialized();
    getDatabase().runSync('INSERT OR REPLACE INTO workouts (id, muscle_group, completed_at, exercise_count) VALUES (?, ?, ?, ?);', workout.id, workout.muscleGroups.join(','), workout.completedAt, workout.exerciseCount);
}
export function getWorkouts() {
    ensureDatabaseInitialized();
    const rows = getDatabase().getAllSync('SELECT id, muscle_group as muscleGroup, completed_at as completedAt, exercise_count as exerciseCount FROM workouts ORDER BY completed_at DESC LIMIT 14;');
    return rows.map((row) => ({ ...row, muscleGroups: row.muscleGroup.split(',').filter(Boolean) }));
}
