import * as SQLite from 'expo-sqlite';
import { CompletedWorkout } from '../types/workout';

let database: SQLite.SQLiteDatabase | null = null;
let isInitialized = false;

function getDatabase(): SQLite.SQLiteDatabase {
  database ??= SQLite.openDatabaseSync('modo-mamado.db');
  return database;
}

function ensureDatabaseInitialized(): void {
  if (isInitialized) return;
  getDatabase().execSync('CREATE TABLE IF NOT EXISTS workouts (id TEXT PRIMARY KEY NOT NULL, muscle_group TEXT NOT NULL, completed_at TEXT NOT NULL, exercise_count INTEGER NOT NULL);');
  isInitialized = true;
}

export function initializeDatabase(): void {
  ensureDatabaseInitialized();
}

export function saveWorkout(workout: CompletedWorkout): void {
  ensureDatabaseInitialized();
  getDatabase().runSync('INSERT OR REPLACE INTO workouts (id, muscle_group, completed_at, exercise_count) VALUES (?, ?, ?, ?);', workout.id, workout.muscleGroups.join(','), workout.completedAt, workout.exerciseCount);
}

export function getWorkouts(): CompletedWorkout[] {
  ensureDatabaseInitialized();
  const rows = getDatabase().getAllSync<{ id: string; muscleGroup: string; completedAt: string; exerciseCount: number }>('SELECT id, muscle_group as muscleGroup, completed_at as completedAt, exercise_count as exerciseCount FROM workouts ORDER BY completed_at DESC LIMIT 14;');
  return rows.map((row) => ({ ...row, muscleGroups: row.muscleGroup.split(',').filter(Boolean) as CompletedWorkout['muscleGroups'] }));
}
