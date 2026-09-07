import * as SQLite from 'expo-sqlite';
import { CompletedWorkout } from '../types/workout';

const database = SQLite.openDatabaseSync('modo-mamado.db');

export function initializeDatabase(): void {
  database.execSync('CREATE TABLE IF NOT EXISTS workouts (id TEXT PRIMARY KEY NOT NULL, muscle_group TEXT NOT NULL, completed_at TEXT NOT NULL, exercise_count INTEGER NOT NULL);');
}

export function saveWorkout(workout: CompletedWorkout): void {
  database.runSync('INSERT OR REPLACE INTO workouts (id, muscle_group, completed_at, exercise_count) VALUES (?, ?, ?, ?);', workout.id, workout.muscleGroups.join(','), workout.completedAt, workout.exerciseCount);
}

export function getWorkouts(): CompletedWorkout[] {
  const rows = database.getAllSync<{ id: string; muscleGroup: string; completedAt: string; exerciseCount: number }>('SELECT id, muscle_group as muscleGroup, completed_at as completedAt, exercise_count as exerciseCount FROM workouts ORDER BY completed_at DESC LIMIT 14;');
  return rows.map((row) => ({ ...row, muscleGroups: row.muscleGroup.split(',').filter(Boolean) as CompletedWorkout['muscleGroups'] }));
}