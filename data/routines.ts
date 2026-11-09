import { muscleGroups } from '../types/workout.ts';
import type { Difficulty, Exercise, ExerciseCategory, EquipmentType, MuscleGroup } from '../types/workout.ts';

type ExerciseOptions = { category: ExerciseCategory; secondaryMuscles?: MuscleGroup[]; difficulty?: Difficulty; restSeconds?: number; mediaId?: string; mediaPose?: 'start' | 'main'; mediaAssetId?: string; mediaSource?: Exercise['mediaSource'] };

const repdbImage = (id: string, pose: 'start' | 'main' = 'start') => `https://exercise-dataset.com/images/flat/${id}-${pose}.webp`;

const exercise = (id: string, name: string, muscleGroup: MuscleGroup, equipment: EquipmentType, sets: number, reps: string, options: ExerciseOptions): Exercise => ({
  id, name, muscleGroup, secondaryMuscles: options.secondaryMuscles ?? [], category: options.category, equipment, difficulty: options.difficulty ?? 'Inicial', sets, reps, restSeconds: options.restSeconds ?? 90,
  instructions: `Controla el movimiento y mantén la técnica. ${equipment}.`,
  mediaUrl: options.mediaId ? repdbImage(options.mediaId, options.mediaPose) : undefined,
  mediaAssetId: options.mediaAssetId,
  mediaSource: options.mediaSource,
});

// Imágenes generadas propias para ejercicios sin coincidencia en RepDB.
const localMedia = {
  bandPress: typeof require === 'function' ? require('../assets/exercises/band-press.webp') : undefined,
  bandCurl: typeof require === 'function' ? require('../assets/exercises/band-curl.webp') : undefined,
  bandPushdown: typeof require === 'function' ? require('../assets/exercises/band-pushdown.webp') : undefined,
  kettlebellPress: typeof require === 'function' ? require('../assets/exercises/kettlebell-press.webp') : undefined,
  pikePushup: typeof require === 'function' ? require('../assets/exercises/pike-pushup.webp') : undefined,
  woodchopper: typeof require === 'function' ? require('../assets/exercises/woodchopper.webp') : undefined,
};

export const routines: Record<MuscleGroup, Exercise[]> = {
  Pecho: [
    exercise('bench-press', 'Press de pecho', 'Pecho', 'Barra', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps', 'Hombros'], difficulty: 'Intermedio', mediaId: 'bench-press' }),
    exercise('incline-press', 'Press inclinado', 'Pecho', 'Mancuernas', 3, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Hombros', 'Tríceps'], difficulty: 'Intermedio', mediaId: 'incline-db-press' }),
    exercise('chest-fly', 'Aperturas', 'Pecho', 'Máquina', 3, '12', { category: 'Máquinas', restSeconds: 60, mediaId: 'machine-chest-fly' }),
    exercise('push-ups', 'Flexiones', 'Pecho', 'Peso corporal', 3, '10-15', { category: 'Calistenia', secondaryMuscles: ['Tríceps', 'Hombros'], mediaId: 'push-up' }),
    exercise('cable-fly', 'Aperturas en polea', 'Pecho', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'cable-fly' }),
    exercise('band-press', 'Press con banda', 'Pecho', 'Bandas', 3, '12-15', { category: 'Bandas', secondaryMuscles: ['Tríceps'], restSeconds: 60, mediaAssetId: 'band-press', mediaSource: localMedia.bandPress }),
    exercise('decline-db-press', 'Press declinado', 'Pecho', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'decline-bench-press' }),
    exercise('db-pullover', 'Pullover', 'Pecho', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', secondaryMuscles: ['Espalda', 'Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'db-pullover' }),
    exercise('chest-dip', 'Fondos para pecho', 'Pecho', 'Barra paralela', 3, '8-10', { category: 'Calistenia', secondaryMuscles: ['Tríceps', 'Hombros'], difficulty: 'Avanzado', restSeconds: 90, mediaId: 'dips' }),
    exercise('incline-barbell-press', 'Press inclinado con barra', 'Pecho', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Hombros', 'Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'incline-bench-press' }),
    exercise('svend-press', 'Press Svend', 'Pecho', 'Mancuernas', 3, '12-15', { category: 'Pesas libres', restSeconds: 60, mediaId: 'svend-press' }),
    exercise('low-cable-fly', 'Aperturas bajas en polea', 'Pecho', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'cable-fly' }),
    exercise('archer-push-ups', 'Flexiones arquero', 'Pecho', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Tríceps', 'Hombros'], difficulty: 'Avanzado', mediaId: 'archer-push-ups' }),
    exercise('cable-chest-press', 'Press de pecho en polea', 'Pecho', 'Polea', 3, '10-12', { category: 'Máquinas', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', mediaId: 'cable-chest-press' }),
    exercise('chest-press-machine', 'Press de pecho en máquina', 'Pecho', 'Máquina', 3, '10-12', { category: 'Máquinas', secondaryMuscles: ['Tríceps'], mediaId: 'chest-press-machine' }),
    exercise('db-bench-press', 'Press de banca con mancuernas', 'Pecho', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps', 'Hombros'], difficulty: 'Intermedio', mediaId: 'db-bench-press' }),
    exercise('db-fly', 'Aperturas con mancuernas', 'Pecho', 'Mancuernas', 3, '12-15', { category: 'Pesas libres', secondaryMuscles: ['Hombros'], mediaId: 'db-fly' }),
    exercise('decline-bench-press-barbell', 'Press declinado con barra', 'Pecho', 'Barra', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', mediaId: 'decline-bench-press-barbell' }),
    exercise('kettlebell-floor-press', 'Press de suelo con kettlebell', 'Pecho', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', mediaId: 'kettlebell-floor-press' }),
    exercise('incline-push-ups', 'Flexiones inclinadas', 'Pecho', 'Peso corporal', 3, '10-15', { category: 'Calistenia', secondaryMuscles: ['Tríceps', 'Hombros'], mediaId: 'incline-push-ups' }),
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
    exercise('db-row', 'Remo a una mano', 'Espalda', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Bíceps'], restSeconds: 90, mediaId: 'single-arm-db-row' }),
    exercise('straight-arm-pulldown', 'Jalón brazos rectos', 'Espalda', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'straight-arm-pulldown' }),
    exercise('hyperextension', 'Hiperextensiones', 'Espalda', 'Peso corporal', 3, '12-15', { category: 'Calistenia', secondaryMuscles: ['Piernas'], restSeconds: 60, mediaId: 'back-extension' }),
    exercise('band-row', 'Remo con banda', 'Espalda', 'Bandas', 3, '12-15', { category: 'Bandas', secondaryMuscles: ['Bíceps'], restSeconds: 60, mediaId: 'barbell-row' }),
    exercise('archer-pull-ups', 'Dominadas arquero', 'Espalda', 'Barra paralela', 3, '6-10', { category: 'Calistenia', secondaryMuscles: ['Bíceps'], difficulty: 'Avanzado', mediaId: 'archer-pull-ups' }),
    exercise('assisted-pull-ups', 'Dominadas asistidas en máquina', 'Espalda', 'Máquina', 3, '8-12', { category: 'Máquinas', secondaryMuscles: ['Bíceps'], mediaId: 'assisted-pull-ups' }),
    exercise('band-assisted-pull-ups', 'Dominadas asistidas con banda', 'Espalda', 'Bandas', 3, '8-12', { category: 'Bandas', secondaryMuscles: ['Bíceps'], mediaId: 'band-assisted-pull-ups' }),
    exercise('chest-supported-kettlebell-row', 'Remo con kettlebell apoyado en el pecho', 'Espalda', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', secondaryMuscles: ['Bíceps'], difficulty: 'Intermedio', mediaId: 'chest-supported-kettlebell-row' }),
    exercise('chest-supported-machine-row', 'Remo con apoyo en el pecho en máquina', 'Espalda', 'Máquina', 3, '10-12', { category: 'Máquinas', secondaryMuscles: ['Bíceps'], mediaId: 'chest-supported-machine-row' }),
    exercise('cable-bent-over-row', 'Remo inclinado en polea', 'Espalda', 'Polea', 3, '10-12', { category: 'Máquinas', secondaryMuscles: ['Bíceps'], difficulty: 'Intermedio', mediaId: 'cable-bent-over-row' }),
    exercise('close-grip-lat-pulldown', 'Jalón al pecho con agarre cerrado', 'Espalda', 'Polea', 3, '10-12', { category: 'Máquinas', secondaryMuscles: ['Bíceps'], mediaId: 'close-grip-lat-pulldown' }),
    exercise('commando-pull-up', 'Dominada commando', 'Espalda', 'Barra paralela', 3, '6-10', { category: 'Calistenia', secondaryMuscles: ['Bíceps'], difficulty: 'Avanzado', mediaId: 'commando-pull-up' }),
  ],
  Bíceps: [
    exercise('barbell-curl', 'Curl con barra', 'Bíceps', 'Barra', 4, '8-12', { category: 'Pesas libres', mediaId: 'barbell-curl' }),
    exercise('incline-curl', 'Curl inclinado', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'incline-db-curl' }),
    exercise('kettlebell-curl', 'Curl con kettlebell', 'Bíceps', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', restSeconds: 60, mediaId: 'kettlebell-hammer-curl' }),
    exercise('band-curl', 'Curl con banda', 'Bíceps', 'Bandas', 3, '12-15', { category: 'Bandas', restSeconds: 60, mediaAssetId: 'band-curl', mediaSource: localMedia.bandCurl }),
    exercise('cable-curl', 'Curl en polea', 'Bíceps', 'Polea', 3, '10-12', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-curl' }),
    exercise('chin-up-underhand', 'Dominada supina', 'Bíceps', 'Barra paralela', 3, '6-10', { category: 'Calistenia', secondaryMuscles: ['Espalda'], difficulty: 'Intermedio', mediaId: 'chin-ups' }),
    exercise('hammer-curl', 'Curl martillo', 'Bíceps', 'Mancuernas', 4, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'hammer-curl' }),
    exercise('preacher-curl', 'Curl predicador', 'Bíceps', 'Barra', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'preacher-curl' }),
    exercise('concentration-curl', 'Curl concentrado', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'concentration-curl' }),
    exercise('spider-curl', 'Curl araña', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'spider-curl' }),
    exercise('high-cable-curl', 'Curl alto en polea', 'Bíceps', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-curl' }),
    exercise('reverse-curl', 'Curl invertido', 'Bíceps', 'Barra', 3, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'reverse-curl' }),
    exercise('barbell-preacher-curl', 'Curl predicador con barra', 'Bíceps', 'Barra', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'barbell-preacher-curl' }),
    exercise('cable-hammer-curl', 'Curl martillo en polea', 'Bíceps', 'Polea', 3, '10-12', { category: 'Máquinas', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'cable-hammer-curl' }),
    exercise('double-kettlebell-bicep-curl', 'Curl de bíceps con dos kettlebells', 'Bíceps', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', restSeconds: 60, mediaId: 'double-kettlebell-bicep-curl' }),
    exercise('ez-bar-curl', 'Curl con barra Z', 'Bíceps', 'Barra', 3, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'ez-bar-curl' }),
    exercise('machine-bicep-curl', 'Curl de bíceps en máquina', 'Bíceps', 'Máquina', 3, '10-12', { category: 'Máquinas', restSeconds: 60, mediaId: 'machine-bicep-curl' }),
    exercise('one-arm-dumbbell-preacher-curl', 'Curl predicador a un brazo con mancuerna', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'one-arm-dumbbell-preacher-curl' }),
    exercise('trx-bicep-curl', 'Curl de bíceps en TRX', 'Bíceps', 'TRX', 3, '10-15', { category: 'Calistenia', restSeconds: 60, mediaId: 'trx-bicep-curl' }),
    exercise('zottman-curl', 'Curl Zottman', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'zottman-curl' }),
  ],
  Tríceps: [
    exercise('pushdown', 'Extensión en polea', 'Tríceps', 'Polea', 4, '10-12', { category: 'Máquinas', mediaId: 'tricep-pushdown' }),
    exercise('skullcrusher', 'Press francés', 'Tríceps', 'Barra', 3, '8-12', { category: 'Pesas libres', difficulty: 'Intermedio', mediaId: 'skull-crusher' }),
    exercise('bench-dip', 'Fondos en banco', 'Tríceps', 'Peso corporal', 3, '10-15', { category: 'Calistenia', secondaryMuscles: ['Pecho'], restSeconds: 60, mediaId: 'bench-dips' }),
    exercise('kettlebell-extension', 'Extensión con kettlebell', 'Tríceps', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', restSeconds: 60, mediaId: 'kettlebell-skull-crusher' }),
    exercise('band-pushdown', 'Extensión con banda', 'Tríceps', 'Bandas', 3, '12-15', { category: 'Bandas', restSeconds: 60, mediaAssetId: 'band-pushdown', mediaSource: localMedia.bandPushdown }),
    exercise('parallel-dip', 'Fondos en paralelas', 'Tríceps', 'Barra paralela', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Pecho', 'Hombros'], difficulty: 'Intermedio', mediaId: 'dips' }),
    exercise('overhead-db-extension', 'Extensión copa', 'Tríceps', 'Mancuernas', 4, '10-12', { category: 'Pesas libres', restSeconds: 60, mediaId: 'dumbbell-tricep-extension' }),
    exercise('rope-pushdown', 'Extensión con cuerda', 'Tríceps', 'Polea', 4, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'tricep-pushdown' }),
    exercise('close-grip-bench', 'Press agarre cerrado', 'Tríceps', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Pecho'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'close-grip-bench-press' }),
    exercise('kickback', 'Patada de tríceps', 'Tríceps', 'Mancuernas', 3, '12-15', { category: 'Pesas libres', restSeconds: 60, mediaId: 'tricep-kickback' }),
    exercise('overhead-cable-extension', 'Extensión en polea alta', 'Tríceps', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'overhead-tricep-extension' }),
    exercise('diamond-pushup', 'Flexiones diamante', 'Tríceps', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Pecho'], difficulty: 'Intermedio', restSeconds: 60, mediaId: 'diamond-push-ups' }),
    exercise('barbell-overhead-extension', 'Extensión por encima de la cabeza con barra', 'Tríceps', 'Barra', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', mediaId: 'barbell-overhead-extension' }),
    exercise('cable-overhead-tricep-extension', 'Extensión de tríceps por encima de la cabeza en polea', 'Tríceps', 'Polea', 3, '12-15', { category: 'Máquinas', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'cable-overhead-tricep-extension' }),
    exercise('cable-tricep-kickback', 'Patada de tríceps en polea', 'Tríceps', 'Polea', 3, '12-15', { category: 'Máquinas', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'cable-tricep-kickback' }),
    exercise('close-grip-db-bench-press', 'Press de banca con agarre cerrado y mancuernas', 'Tríceps', 'Mancuernas', 3, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Pecho'], difficulty: 'Intermedio', mediaId: 'close-grip-db-bench-press' }),
    exercise('kettlebell-overhead-tricep-extension', 'Extensión de tríceps sobre la cabeza con kettlebell', 'Tríceps', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'kettlebell-overhead-tricep-extension' }),
    exercise('machine-triceps-extension', 'Extensión de tríceps en máquina', 'Tríceps', 'Máquina', 3, '10-12', { category: 'Máquinas', restSeconds: 60, mediaId: 'machine-triceps-extension' }),
    exercise('reverse-plank-dips', 'Fondos en plancha invertida', 'Tríceps', 'Peso corporal', 3, '10-15', { category: 'Calistenia', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'reverse-plank-dips' }),
    exercise('trx-tricep-extension', 'Extensión de tríceps en TRX', 'Tríceps', 'TRX', 3, '10-15', { category: 'Calistenia', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'trx-tricep-extension' }),
  ],
  Hombros: [
    exercise('shoulder-press', 'Press militar', 'Hombros', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', mediaId: 'dumbbell-shoulder-press' }),
    exercise('lateral-raise', 'Elevaciones laterales', 'Hombros', 'Mancuernas', 4, '12-15', { category: 'Pesas libres', restSeconds: 60, mediaId: 'lateral-raise' }),
    exercise('band-pull-apart', 'Pull apart con banda', 'Hombros', 'Bandas', 3, '15-20', { category: 'Bandas', secondaryMuscles: ['Espalda'], restSeconds: 60, mediaId: 'band-pull-apart' }),
    exercise('kettlebell-press', 'Press con kettlebell', 'Hombros', 'Kettlebell', 4, '8-10', { category: 'Kettlebell', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaAssetId: 'kettlebell-press', mediaSource: localMedia.kettlebellPress }),
    exercise('pike-pushup', 'Flexión pike', 'Hombros', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 60, mediaAssetId: 'pike-pushup', mediaSource: localMedia.pikePushup }),
    exercise('cable-front-raise', 'Elevación frontal en polea', 'Hombros', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-front-raise' }),
    exercise('arnold-press', 'Press Arnold', 'Hombros', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'dumbbell-shoulder-press' }),
    exercise('rear-delt-fly', 'Pájaro con mancuernas', 'Hombros', 'Mancuernas', 4, '12-15', { category: 'Pesas libres', secondaryMuscles: ['Espalda'], restSeconds: 60, mediaId: 'dumbbell-reverse-fly' }),
    exercise('upright-row', 'Remo al mentón', 'Hombros', 'Barra', 3, '10-12', { category: 'Pesas libres', secondaryMuscles: ['Espalda'], difficulty: 'Intermedio', restSeconds: 60, mediaId: 'upright-row' }),
    exercise('front-raise', 'Elevación frontal con mancuernas', 'Hombros', 'Mancuernas', 3, '12-15', { category: 'Pesas libres', restSeconds: 60, mediaId: 'dumbbell-front-raise' }),
    exercise('cable-lateral-raise', 'Elevación lateral en polea', 'Hombros', 'Polea', 4, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-lateral-raise' }),
    exercise('reverse-pec-deck', 'Cruces posteriores en máquina', 'Hombros', 'Máquina', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Espalda'], restSeconds: 60, mediaId: 'dumbbell-reverse-fly' }),
    exercise('barbell-front-raise', 'Elevación frontal con barra', 'Hombros', 'Barra', 3, '10-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'barbell-front-raise' }),
    exercise('barbell-rear-delt-row', 'Remo con barra para deltoides posteriores', 'Hombros', 'Barra', 3, '10-12', { category: 'Pesas libres', secondaryMuscles: ['Espalda'], difficulty: 'Intermedio', mediaId: 'barbell-rear-delt-row' }),
    exercise('cable-reverse-fly', 'Apertura inversa en polea', 'Hombros', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Espalda'], difficulty: 'Intermedio', restSeconds: 60, mediaId: 'cable-reverse-fly' }),
    exercise('cable-upright-row', 'Remo al mentón en polea', 'Hombros', 'Polea', 3, '10-12', { category: 'Máquinas', secondaryMuscles: ['Espalda'], difficulty: 'Intermedio', restSeconds: 60, mediaId: 'cable-upright-row' }),
    exercise('bodyweight-lateral-raise', 'Elevación lateral con peso corporal', 'Hombros', 'Peso corporal', 3, '10-15', { category: 'Calistenia', restSeconds: 60, mediaId: 'bodyweight-lateral-raise' }),
    exercise('double-kettlebell-clean-and-press', 'Clean and press con dos kettlebells', 'Hombros', 'Kettlebell', 3, '8-10', { category: 'Kettlebell', secondaryMuscles: ['Tríceps'], difficulty: 'Avanzado', restSeconds: 90, mediaId: 'double-kettlebell-clean-and-press' }),
    exercise('double-db-overhead-carry', 'Paseo sobre la cabeza con dos mancuernas', 'Hombros', 'Mancuernas', 3, '30-40 seg', { category: 'Pesas libres', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 60, mediaId: 'double-db-overhead-carry', mediaPose: 'main' }),
    exercise('dumbbell-push-press', 'Push press con mancuernas', 'Hombros', 'Mancuernas', 3, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', mediaId: 'dumbbell-push-press' }),
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
    exercise('banded-clamshell', 'Almeja con banda', 'Piernas', 'Bandas', 3, '12-15 por lado', { category: 'Bandas', restSeconds: 60, mediaId: 'banded-clamshell' }),
    exercise('banded-hip-thrust', 'Empuje de cadera con banda', 'Piernas', 'Bandas', 3, '12-15', { category: 'Bandas', secondaryMuscles: ['Core'], restSeconds: 60, mediaId: 'banded-hip-thrust' }),
    exercise('banded-romanian-deadlift', 'Peso muerto rumano con banda', 'Piernas', 'Bandas', 3, '12-15', { category: 'Bandas', secondaryMuscles: ['Espalda'], restSeconds: 60, mediaId: 'banded-romanian-deadlift' }),
    exercise('barbell-box-squat', 'Sentadilla a caja con barra', 'Piernas', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 120, mediaId: 'barbell-box-squat' }),
    exercise('barbell-calf-raise', 'Elevación de talones con barra', 'Piernas', 'Barra', 4, '12-20', { category: 'Pesas libres', restSeconds: 60, mediaId: 'barbell-calf-raise' }),
    exercise('barbell-reverse-lunge', 'Zancada inversa con barra', 'Piernas', 'Barra', 3, '8-12 por lado', { category: 'Pesas libres', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 90, mediaId: 'barbell-reverse-lunge' }),
    exercise('ball-leg-curl', 'Curl femoral con pelota de estabilidad', 'Piernas', 'Pelota de estabilidad', 3, '10-15', { category: 'Peso corporal', restSeconds: 60, mediaId: 'ball-leg-curl' }),
    exercise('bodyweight-calf-raise', 'Elevación de talones con peso corporal', 'Piernas', 'Peso corporal', 3, '15-20', { category: 'Peso corporal', restSeconds: 45, mediaId: 'bodyweight-calf-raise' }),
  ],
  Core: [
    exercise('plank', 'Plancha', 'Core', 'Peso corporal', 3, '45 seg', { category: 'Peso corporal', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaId: 'plank', mediaPose: 'main' }),
    exercise('cable-crunch', 'Crunch en polea', 'Core', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60, mediaId: 'cable-crunch' }),
    exercise('band-pallof', 'Pallof press', 'Core', 'Bandas', 3, '10-12', { category: 'Bandas', restSeconds: 60, mediaId: 'cable-pallof-press' }),
    exercise('hanging-knee-raise', 'Elevación de rodillas', 'Core', 'Barra paralela', 3, '8-12', { category: 'Calistenia', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'hanging-knee-raise' }),
    exercise('kettlebell-twist', 'Giro ruso con kettlebell', 'Core', 'Kettlebell', 3, '12-15', { category: 'Kettlebell', restSeconds: 60, mediaId: 'kettlebell-russian-twist' }),
    exercise('mountain-climber', 'Mountain climbers', 'Core', 'Peso corporal', 3, '20-30', { category: 'Peso corporal', secondaryMuscles: ['Piernas'], restSeconds: 45, mediaId: 'mountain-climbers' }),
    exercise('ab-wheel-rollout', 'Rueda abdominal', 'Core', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Espalda'], difficulty: 'Avanzado', restSeconds: 60, mediaId: 'ab-wheel-rollout' }),
    exercise('hanging-leg-raise', 'Elevación de piernas', 'Core', 'Barra paralela', 3, '8-12', { category: 'Calistenia', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'hanging-leg-raise' }),
    exercise('side-plank', 'Plancha lateral', 'Core', 'Peso corporal', 3, '30-45 seg', { category: 'Peso corporal', restSeconds: 60, mediaId: 'side-plank', mediaPose: 'main' }),
    exercise('bicycle-crunch', 'Crunch bicicleta', 'Core', 'Peso corporal', 3, '15-20', { category: 'Peso corporal', restSeconds: 45, mediaId: 'bicycle-crunch' }),
    exercise('woodchopper', 'Leñador en polea', 'Core', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60, mediaAssetId: 'woodchopper', mediaSource: localMedia.woodchopper }),
    exercise('dead-bug', 'Dead bug', 'Core', 'Peso corporal', 3, '12-15', { category: 'Peso corporal', restSeconds: 45, mediaId: 'dead-bug' }),
    exercise('ball-pike', 'Pike con pelota de estabilidad', 'Core', 'Pelota de estabilidad', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Hombros'], difficulty: 'Avanzado', restSeconds: 60, mediaId: 'ball-pike' }),
    exercise('barbell-ab-rollout', 'Rueda abdominal con barra', 'Core', 'Barra', 3, '8-12', { category: 'Pesas libres', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'barbell-ab-rollout' }),
    exercise('barbell-zercher-hold', 'Sostén Zercher con barra', 'Core', 'Barra', 3, '30-45 seg', { category: 'Pesas libres', difficulty: 'Avanzado', restSeconds: 60, mediaId: 'barbell-zercher-hold', mediaPose: 'main' }),
    exercise('bear-plank-hold', 'Plancha del oso isométrica', 'Core', 'Peso corporal', 3, '30-45 seg', { category: 'Peso corporal', secondaryMuscles: ['Hombros'], restSeconds: 45, mediaId: 'bear-plank-hold', mediaPose: 'main' }),
    exercise('captains-chair-knee-raise', 'Elevación de rodillas en silla romana', 'Core', 'Máquina', 3, '10-15', { category: 'Máquinas', difficulty: 'Intermedio', restSeconds: 60, mediaId: 'captains-chair-knee-raise' }),
    exercise('cross-body-crunch', 'Crunch cruzado', 'Core', 'Peso corporal', 3, '12-15 por lado', { category: 'Peso corporal', restSeconds: 45, mediaId: 'cross-body-crunch' }),
    exercise('dumbbell-side-bend', 'Flexión lateral con mancuerna', 'Core', 'Mancuernas', 3, '12-15 por lado', { category: 'Pesas libres', restSeconds: 60, mediaId: 'dumbbell-side-bend' }),
    exercise('dead-bug-hold', 'Dead bug isométrico', 'Core', 'Peso corporal', 3, '30-45 seg', { category: 'Peso corporal', restSeconds: 45, mediaId: 'dead-bug-hold', mediaPose: 'main' }),
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

export function getRoutineExercises(
  selectedMuscles: MuscleGroup[],
  availableEquipment: EquipmentType[],
  substitutions: Record<string, string> = {},
): { original: Exercise; exercise: Exercise }[] {
  return getExercisesForMuscles(selectedMuscles).map((original) => {
    const substituteId = substitutions[original.id];
    const substitute = substituteId ? getExerciseById(substituteId) : undefined;
    const exercise = substitute && substitute.muscleGroup === original.muscleGroup && availableEquipment.includes(substitute.equipment)
      ? substitute
      : original;
    return { original, exercise };
  }).filter(({ exercise }) => availableEquipment.includes(exercise.equipment));
}

export function getSubstitutes(exercise: Exercise, availableEquipment?: EquipmentType[]): Exercise[] {
  return allExercises.filter((item) => item.id !== exercise.id && item.muscleGroup === exercise.muscleGroup && item.equipment !== exercise.equipment && (!availableEquipment || availableEquipment.includes(item.equipment)));
}