import * as SQLite from 'expo-sqlite';
import { CompletedWorkout } from '../types/workout';

const database = SQLite.openDatabaseSync('modo-mamado.db');

export function initializeDatabase(): void {
  database.execSync('CREATE TABLE IF NOT EXISTS workouts (id TEXT PRIMARY KEY NOT NULL, muscle_group TEXT NOT NULL, completed_at TEXT NOT NULL, exercise_count INTEGER NOT NULL);');
}

export function saveWorkout(workout: CompletedWorkout): void {
  database.runSync('INSERT OR REPLACE INTO workouts (id, muscle_group, completed_at, exercise_count) VALUES (?, ?, ?, ?);', workout.id, workout.muscleGroup, workout.completedAt, workout.exerciseCount);
}

export function getWorkouts(): CompletedWorkout[] {
  return database.getAllSync<CompletedWorkout>('SELECT id, muscle_group as muscleGroup, completed_at as completedAt, exercise_count as exerciseCount FROM workouts ORDER BY completed_at DESC LIMIT 14;');
}