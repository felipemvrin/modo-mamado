import * as SQLite from 'expo-sqlite';
import { CompletedWorkout } from '../types/workout';

const database = SQLite.openDatabaseSync('modo-mamado.db');

export function initializeDatabase(): void {
  database.execSync('CREATE TABLE IF NOT EXISTS workouts (id TEXT PRIMARY KEY NOT NULL, muscle_group TEXT NOT NULL, completed_at TEXT NOT NULL, exercise_count INTEGER NOT NULL);');
  database.execSync('CREATE TABLE IF NOT EXISTS set_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, workout_id TEXT NOT NULL, exercise_id TEXT NOT NULL, set_index INTEGER NOT NULL, weight REAL NOT NULL, reps INTEGER NOT NULL, completed_at TEXT NOT NULL);');
}

export function saveWorkout(workout: CompletedWorkout): void {
  database.runSync('INSERT OR REPLACE INTO workouts (id, muscle_group, completed_at, exercise_count) VALUES (?, ?, ?, ?);', workout.id, workout.muscleGroups.join(','), workout.completedAt, workout.exerciseCount);
  workout.setLogs?.forEach((log) => {
    database.runSync('INSERT INTO set_logs (workout_id, exercise_id, set_index, weight, reps, completed_at) VALUES (?, ?, ?, ?, ?, ?);', workout.id, log.exerciseId, log.setIndex, log.weight, log.reps, workout.completedAt);
  });
}

export function getWorkouts(): CompletedWorkout[] {
  const rows = database.getAllSync<{ id: string; muscleGroup: string; completedAt: string; exerciseCount: number }>('SELECT id, muscle_group as muscleGroup, completed_at as completedAt, exercise_count as exerciseCount FROM workouts ORDER BY completed_at DESC LIMIT 14;');
  return rows.map((row) => ({ ...row, muscleGroups: row.muscleGroup.split(',').filter(Boolean) as CompletedWorkout['muscleGroups'] }));
}

export function getLastSetLog(exerciseId: string): { weight: number; reps: number } | null {
  const row = database.getFirstSync<{ weight: number; reps: number }>('SELECT weight, reps FROM set_logs WHERE exercise_id = ? ORDER BY completed_at DESC, id DESC LIMIT 1;', exerciseId);
  return row ?? null;
}