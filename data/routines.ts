import { muscleGroups } from '../types/workout.ts';
import type { Difficulty, Exercise, ExerciseCategory, EquipmentType, MuscleGroup } from '../types/workout.ts';

type ExerciseOptions = { category: ExerciseCategory; secondaryMuscles?: MuscleGroup[]; difficulty?: Difficulty; restSeconds?: number; mediaId?: string; mediaSource?: Exercise['mediaSource'] };

const repdbImage = (id: string) => `https://exercise-dataset.com/images/flat/${id}-start.webp`;

const exercise = (id: string, name: string, muscleGroup: MuscleGroup, equipment: EquipmentType, sets: number, reps: string, options: ExerciseOptions): Exercise => ({
  id, name, muscleGroup, secondaryMuscles: options.secondaryMuscles ?? [], category: options.category, equipment, difficulty: options.difficulty ?? 'Inicial', sets, reps, restSeconds: options.restSeconds ?? 90,
  instructions: `Controla el movimiento y mantén la técnica. ${equipment}.`,
  mediaUrl: options.mediaId ? repdbImage(options.mediaId) : undefined,
  mediaSource: options.mediaSource,
});

// Imágenes generadas propias para ejercicios sin coincidencia en RepDB.
const localMedia = {
  bandPress: typeof require === 'function' ? require('../assets/exercises/band-press.webp') : undefined,
  bandCurl: typeof require === 'function' ? require('../assets/exercises/band-curl.webp') : undefined,
  bandPushdown: typeof require === 'function' ? require('../assets/exercises/band-pushdown.webp') : undefined,
  kettlebellPress: typeof require === 'function' ? require('../assets/exercises/kettlebell-press.webp') : undefined,
  pikePushup: typeof require === 'function' ? require('../assets/exercises/pike-pushup.webp') : undefined,
};

export const routines: Record<MuscleGroup, Exercise[]> = {
  Pecho: [
    exercise('bench-press', 'Press de pecho', 'Pecho', 'Barra', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps', 'Hombros'], difficulty: 'Intermedio', mediaId: 'bench-press' }),
    exercise('incline-press', 'Press inclinado', 'Pecho', 'Mancuernas', 3, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Hombros', 'Tríceps'], difficulty: 'Intermedio', mediaId: 'incline-db-press' }),
    exercise('chest-fly', 'Aperturas', 'Pecho', 'Máquina', 3, '12', { category: 'Máquinas', restSeconds: 60, mediaId: 'machine-chest-fly' }),
    exercise('push-ups', 'Flexiones', 'Pecho', 'Peso corporal', 3, '10-15', { category: 'Calistenia', secondaryMuscles: ['Tríceps', 'Hombros'], mediaId: 'push-up' }),
    exercise('cable-fly', 'Aperturas en polea', 'Pecho', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'cable-fly' }),
    exercise('band-press', 'Press con banda', 'Pecho', 'Bandas', 3, '12-15', { category: 'Bandas', secondaryMuscles: ['Tríceps'], restSeconds: 60, mediaSource: localMedia.bandPress }),
    exercise('decline-db-press', 'Press declinado', 'Pecho', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'decline-bench-press' }),
    exercise('db-pullover', 'Pullover', 'Pecho', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', secondaryMuscles: ['Espalda', 'Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'barbell-pullover' }),
    exercise('chest-dip', 'Fondos para pecho', 'Pecho', 'Barra paralela', 3, '8-10', { category: 'Calistenia', secondaryMuscles: ['Tríceps', 'Hombros'], difficulty: 'Avanzado', restSeconds: 90, mediaId: 'dips' }),
    exercise('incline-barbell-press', 'Press inclinado con barra', 'Pecho', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Hombros', 'Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'incline-bench-press' }),
    exercise('svend-press', 'Press Svend', 'Pecho', 'Mancuernas', 3, '12-15', { category: 'Pesas libres', restSeconds: 60, mediaId: 'svend-press' }),
    exercise('low-cable-fly', 'Aperturas bajas en polea', 'Pecho', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'cable-fly' }),
  ],
  Espalda: [
    exercise('lat-pulldown', 'Jalón al pecho', 'Espalda', 'Polea', 4, '8-12', { category: 'Máquinas', secondaryMuscles: ['Bíceps'], mediaId: 'lat-pulldown' }),
    exercise('barbell-row', 'Remo con barra', 'Espalda', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Bíceps'], difficulty: 'Intermedio', mediaId: 'barbell-row' }),
    exercise('face-pull', 'Face pull', 'Espalda', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'face-pull' }),
    exercise('inverted-row', 'Remo invertido', 'Espalda', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Bíceps'], difficulty: 'Intermedio', mediaId: 'inverted-row' }),
    exercise('pull-up', 'Dominadas', 'Espalda', 'Barra paralela', 4, '6-10', { category: 'Calistenia', secondaryMuscles: ['Bíceps'], difficulty: 'Avanzado', mediaId: 'pull-up' }),
    exercise('kettlebell-row', 'Remo con kettlebell', 'Espalda', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', secondaryMuscles: ['Bíceps'], restSeconds: 60, mediaId: 'one-arm-kettlebell-row' }),
    exercise('t-bar-row', 'Remo en barra T', 'Espalda', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Bíceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 't-bar-row' }),
    exercise('seated-cable-row', 'Remo sentado en polea', 'Espalda', 'Polea', 4, '10-12', { category: 'Máquinas', secondaryMuscles: ['Bíceps'], restSeconds: 90, mediaId: 'seated-cable-row' }),
    exercise('db-row', 'Remo a una mano', 'Espalda', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Bíceps'], restSeconds: 90, mediaId: 'one-arm-db-row' }),
    exercise('straight-arm-pulldown', 'Jalón brazos rectos', 'Espalda', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'straight-arm-pulldown' }),
    exercise('hyperextension', 'Hiperextensiones', 'Espalda', 'Peso corporal', 3, '12-15', { category: 'Calistenia', secondaryMuscles: ['Piernas'], restSeconds: 60, mediaId: 'back-extension' }),
    exercise('band-row', 'Remo con banda', 'Espalda', 'Bandas', 3, '12-15', { category: 'Bandas', secondaryMuscles: ['Bíceps'], restSeconds: 60, mediaId: 'barbell-row' }),
  ],
  Bíceps: [
    exercise('barbell-curl', 'Curl con barra', 'Bíceps', 'Barra', 4, '8-12', { category: 'Pesas libres', mediaId: 'barbell-curl' }),
    exercise('incline-curl', 'Curl inclinado', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'incline-db-curl' }),
    exercise('kettlebell-curl', 'Curl con kettlebell', 'Bíceps', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', restSeconds: 60, mediaId: 'kettlebell-hammer-curl' }),
    exercise('band-curl', 'Curl con banda', 'Bíceps', 'Bandas', 3, '12-15', { category: 'Bandas', restSeconds: 60, mediaSource: localMedia.bandCurl }),
    exercise('cable-curl', 'Curl en polea', 'Bíceps', 'Polea', 3, '10-12', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-curl' }),
    exercise('chin-up-underhand', 'Dominada supina', 'Bíceps', 'Barra paralela', 3, '6-10', { category: 'Calistenia', secondaryMuscles: ['Espalda'], difficulty: 'Intermedio', mediaId: 'chin-ups' }),
    exercise('hammer-curl', 'Curl martillo', 'Bíceps', 'Mancuernas', 4, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'hammer-curl' }),
    exercise('preacher-curl', 'Curl predicador', 'Bíceps', 'Barra', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'preacher-curl' }),
    exercise('concentration-curl', 'Curl concentrado', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'concentration-curl' }),
    exercise('spider-curl', 'Curl araña', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'spider-curl' }),
    exercise('high-cable-curl', 'Curl alto en polea', 'Bíceps', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-curl' }),
    exercise('reverse-curl', 'Curl invertido', 'Bíceps', 'Barra', 3, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'reverse-curl' }),
  ],
  Tríceps: [
    exercise('pushdown', 'Extensión en polea', 'Tríceps', 'Polea', 4, '10-12', { category: 'Máquinas', mediaId: 'tricep-pushdown' }),
    exercise('skullcrusher', 'Press francés', 'Tríceps', 'Barra', 3, '8-12', { category: 'Pesas libres', difficulty: 'Intermedio', mediaId: 'skull-crusher' }),
    exercise('bench-dip', 'Fondos en banco', 'Tríceps', 'Peso corporal', 3, '10-15', { category: 'Calistenia', secondaryMuscles: ['Pecho'], restSeconds: 60, mediaId: 'bench-dips' }),
    exercise('kettlebell-extension', 'Extensión con kettlebell', 'Tríceps', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', restSeconds: 60, mediaId: 'kettlebell-skull-crusher' }),
    exercise('band-pushdown', 'Extensión con banda', 'Tríceps', 'Bandas', 3, '12-15', { category: 'Bandas', restSeconds: 60, mediaSource: localMedia.bandPushdown }),
    exercise('parallel-dip', 'Fondos en paralelas', 'Tríceps', 'Barra paralela', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Pecho', 'Hombros'], difficulty: 'Intermedio', mediaId: 'dips' }),
    exercise('overhead-db-extension', 'Extensión copa', 'Tríceps', 'Mancuernas', 4, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'tricep-pushdown' }),
    exercise('rope-pushdown', 'Extensión con cuerda', 'Tríceps', 'Polea', 4, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'tricep-pushdown' }),
    exercise('close-grip-bench', 'Press agarre cerrado', 'Tríceps', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Pecho'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'close-grip-bench-press' }),
    exercise('kickback', 'Patada de tríceps', 'Tríceps', 'Mancuernas', 3, '12-15', { category: 'Pesas libres', restSeconds: 60, mediaId: 'tricep-pushdown' }),
    exercise('overhead-cable-extension', 'Extensión en polea alta', 'Tríceps', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'tricep-pushdown' }),
    exercise('diamond-pushup', 'Flexiones diamante', 'Tríceps', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Pecho'], difficulty: 'Intermedio', restSeconds: 60, mediaId: 'push-up' }),
  ],
  Hombros: [
    exercise('shoulder-press', 'Press militar', 'Hombros', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', mediaId: 'dumbbell-shoulder-press' }),
    exercise('lateral-raise', 'Elevaciones laterales', 'Hombros', 'Mancuernas', 4, '12-15', { category: 'Pesas libres', restSeconds: 60, mediaId: 'lateral-raise' }),
    exercise('band-pull-apart', 'Pull apart con banda', 'Hombros', 'Bandas', 3, '15-20', { category: 'Bandas', secondaryMuscles: ['Espalda'], restSeconds: 60, mediaId: 'band-pull-apart' }),
    exercise('kettlebell-press', 'Press con kettlebell', 'Hombros', 'Kettlebell', 4, '8-10', { category: 'Kettlebell', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaSource: localMedia.kettlebellPress }),
    exercise('pike-pushup', 'Flexión pike', 'Hombros', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 60, mediaSource: localMedia.pikePushup }),
    exercise('cable-front-raise', 'Elevación frontal en polea', 'Hombros', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-front-raise' }),
    exercise('arnold-press', 'Press Arnold', 'Hombros', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'dumbbell-shoulder-press' }),
    exercise('rear-delt-fly', 'Pájaro con mancuernas', 'Hombros', 'Mancuernas', 4, '12-15', { category: 'Pesas libres', secondaryMuscles: ['Espalda'], restSeconds: 60, mediaId: 'rear-delt-fly' }),
    exercise('upright-row', 'Remo al mentón', 'Hombros', 'Barra', 3, '10-12', { category: 'Pesas libres', secondaryMuscles: ['Espalda'], difficulty: 'Intermedio', restSeconds: 60, mediaId: 'upright-row' }),
    exercise('front-raise', 'Elevación frontal con mancuernas', 'Hombros', 'Mancuernas', 3, '12-15', { category: 'Pesas libres', restSeconds: 60, mediaId: 'dumbbell-front-raise' }),
    exercise('cable-lateral-raise', 'Elevación lateral en polea', 'Hombros', 'Polea', 4, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-lateral-raise' }),
    exercise('reverse-pec-deck', 'Cruces posteriores en máquina', 'Hombros', 'Máquina', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Espalda'], restSeconds: 60, mediaId: 'machine-chest-fly' }),
  ],
  Piernas: [
    exercise('squat', 'Sentadilla', 'Piernas', 'Barra', 4, '6-10', { category: 'Pesas libres', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 120, mediaId: 'squat' }),
    exercise('leg-press', 'Prensa', 'Piernas', 'Máquina', 3, '10-12', { category: 'Máquinas', restSeconds: 90, mediaId: 'leg-press' }),
    exercise('leg-curl', 'Curl femoral', 'Piernas', 'Máquina', 3, '12', { category: 'Máquinas', restSeconds: 60, mediaId: 'leg-curl' }),
    exercise('kettlebell-swing', 'Swing con kettlebell', 'Piernas', 'Kettlebell', 4, '12-15', { category: 'Kettlebell', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'kettlebell-swing' }),
    exercise('band-squat', 'Sentadilla con banda', 'Piernas', 'Bandas', 3, '15-20', { category: 'Bandas', restSeconds: 60, mediaId: 'banded-squat' }),
    exercise('lunge', 'Zancadas', 'Piernas', 'Peso corporal', 3, '10-12', { category: 'Calistenia', secondaryMuscles: ['Core'], restSeconds: 60, mediaId: 'lunge' }),
    exercise('romanian-deadlift', 'Peso muerto rumano', 'Piernas', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Espalda'], difficulty: 'Intermedio', restSeconds: 120, mediaId: 'romanian-deadlift' }),
    exercise('bulgarian-split-squat', 'Sentadilla búlgara', 'Piernas', 'Mancuernas', 3, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'bulgarian-split-squat' }),
    exercise('leg-extension', 'Extensión de cuadríceps', 'Piernas', 'Máquina', 4, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'leg-extension' }),
    exercise('hip-thrust', 'Hip thrust', 'Piernas', 'Barra', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'hip-thrust' }),
    exercise('calf-raise', 'Elevación de talones', 'Piernas', 'Máquina', 4, '15-20', { category: 'Máquinas', restSeconds: 60, mediaId: 'machine-calf-raise' }),
    exercise('goblet-squat', 'Sentadilla copa', 'Piernas', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', secondaryMuscles: ['Core'], restSeconds: 60, mediaId: 'goblet-squat' }),
  ],
  Core: [
    exercise('plank', 'Plancha', 'Core', 'Peso corporal', 3, '45 seg', { category: 'Peso corporal', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'plank' }),
    exercise('cable-crunch', 'Crunch en polea', 'Core', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-crunch' }),
    exercise('band-pallof', 'Pallof press', 'Core', 'Bandas', 3, '10-12', { category: 'Bandas', restSeconds: 60, mediaId: 'cable-pallof-press' }),
    exercise('hanging-knee-raise', 'Elevación de rodillas', 'Core', 'Barra paralela', 3, '8-12', { category: 'Calistenia', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'hanging-knee-raise' }),
    exercise('kettlebell-twist', 'Giro ruso con kettlebell', 'Core', 'Kettlebell', 3, '12-15', { category: 'Kettlebell', restSeconds: 60, mediaId: 'kettlebell-russian-twist' }),
    exercise('mountain-climber', 'Mountain climbers', 'Core', 'Peso corporal', 3, '20-30', { category: 'Peso corporal', secondaryMuscles: ['Piernas'], restSeconds: 45, mediaId: 'mountain-climbers' }),
    exercise('ab-wheel-rollout', 'Rueda abdominal', 'Core', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Espalda'], difficulty: 'Avanzado', restSeconds: 60, mediaId: 'ab-wheel-rollout' }),
    exercise('hanging-leg-raise', 'Elevación de piernas', 'Core', 'Barra paralela', 3, '8-12', { category: 'Calistenia', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'hanging-leg-raise' }),
    exercise('side-plank', 'Plancha lateral', 'Core', 'Peso corporal', 3, '30-45 seg', { category: 'Peso corporal', restSeconds: 60, mediaId: 'plank' }),
    exercise('bicycle-crunch', 'Crunch bicicleta', 'Core', 'Peso corporal', 3, '15-20', { category: 'Peso corporal', restSeconds: 45, mediaId: 'bicycle-crunch' }),
    exercise('woodchopper', 'Leñador en polea', 'Core', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'cable-crunch' }),
    exercise('dead-bug', 'Dead bug', 'Core', 'Peso corporal', 3, '12-15', { category: 'Peso corporal', restSeconds: 45, mediaId: 'plank' }),
  ],
};

export const defaultMuscle: MuscleGroup = muscleGroups[0];

export function getExercisesForMuscles(selectedMuscles: MuscleGroup[]): Exercise[] {
  return selectedMuscles.flatMap((muscle) => routines[muscle]);
}

export const allExercises: Exercise[] = Object.values(routines).flat();

export function getExercisesByCategory(category: ExerciseCategory): Exercise[] {
  return allExercises.filter((item) => item.category === category);
}

export function getExercisesByEquipment(equipment: EquipmentType): Exercise[] {
  return allExercises.filter((item) => item.equipment === equipment);
}

export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find((item) => item.id === id);
}

export function getSubstitutes(exercise: Exercise, availableEquipment?: EquipmentType[]): Exercise[] {
  return allExercises.filter((item) => item.id !== exercise.id && item.muscleGroup === exercise.muscleGroup && item.equipment !== exercise.equipment && (!availableEquipment || availableEquipment.includes(item.equipment)));
}