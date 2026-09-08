import { Difficulty, Exercise, ExerciseCategory, EquipmentType, MuscleGroup, muscleGroups } from '../types/workout';

type ExerciseOptions = { category: ExerciseCategory; secondaryMuscles?: MuscleGroup[]; difficulty?: Difficulty; restSeconds?: number };

const exercise = (id: string, name: string, muscleGroup: MuscleGroup, equipment: EquipmentType, sets: number, reps: string, options: ExerciseOptions): Exercise => ({
  id, name, muscleGroup, secondaryMuscles: options.secondaryMuscles ?? [], category: options.category, equipment, difficulty: options.difficulty ?? 'Inicial', sets, reps, restSeconds: options.restSeconds ?? 90,
  instructions: `Controla el movimiento y mantén la técnica. ${equipment}.`,
});

export const routines: Record<MuscleGroup, Exercise[]> = {
  Pecho: [exercise('bench-press', 'Press de pecho', 'Pecho', 'Barra', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps', 'Hombros'], difficulty: 'Intermedio' }), exercise('incline-press', 'Press inclinado', 'Pecho', 'Mancuernas', 3, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Hombros', 'Tríceps'], difficulty: 'Intermedio' }), exercise('chest-fly', 'Aperturas', 'Pecho', 'Máquina', 3, '12', { category: 'Máquinas', restSeconds: 60 }), exercise('push-ups', 'Flexiones', 'Pecho', 'Peso corporal', 3, '10-15', { category: 'Calistenia', secondaryMuscles: ['Tríceps', 'Hombros'] }), exercise('cable-fly', 'Aperturas en polea', 'Pecho', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60 }), exercise('band-press', 'Press con banda', 'Pecho', 'Bandas', 3, '12-15', { category: 'Bandas', secondaryMuscles: ['Tríceps'], restSeconds: 60 })],
  Espalda: [exercise('lat-pulldown', 'Jalón al pecho', 'Espalda', 'Polea', 4, '8-12', { category: 'Máquinas', secondaryMuscles: ['Bíceps'] }), exercise('barbell-row', 'Remo con barra', 'Espalda', 'Barra', 4, '8-10', { category: 'Pesas libres', secondaryMuscles: ['Bíceps'], difficulty: 'Intermedio' }), exercise('face-pull', 'Face pull', 'Espalda', 'Polea', 3, '12-15', { category: 'Máquinas', secondaryMuscles: ['Hombros'], restSeconds: 60 }), exercise('inverted-row', 'Remo invertido', 'Espalda', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Bíceps'], difficulty: 'Intermedio' }), exercise('pull-up', 'Dominadas', 'Espalda', 'Barra paralela', 4, '6-10', { category: 'Calistenia', secondaryMuscles: ['Bíceps'], difficulty: 'Avanzado' }), exercise('kettlebell-row', 'Remo con kettlebell', 'Espalda', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', secondaryMuscles: ['Bíceps'], restSeconds: 60 })],
  Bíceps: [exercise('barbell-curl', 'Curl con barra', 'Bíceps', 'Barra', 4, '8-12', { category: 'Pesas libres' }), exercise('incline-curl', 'Curl inclinado', 'Bíceps', 'Mancuernas', 3, '10-12', { category: 'Pesas libres', restSeconds: 60 }), exercise('kettlebell-curl', 'Curl con kettlebell', 'Bíceps', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', restSeconds: 60 }), exercise('band-curl', 'Curl con banda', 'Bíceps', 'Bandas', 3, '12-15', { category: 'Bandas', restSeconds: 60 }), exercise('cable-curl', 'Curl en polea', 'Bíceps', 'Polea', 3, '10-12', { category: 'Máquinas', restSeconds: 60 })],
  Tríceps: [exercise('pushdown', 'Extensión en polea', 'Tríceps', 'Polea', 4, '10-12', { category: 'Máquinas' }), exercise('skullcrusher', 'Press francés', 'Tríceps', 'Barra', 3, '8-12', { category: 'Pesas libres', difficulty: 'Intermedio' }), exercise('bench-dip', 'Fondos en banco', 'Tríceps', 'Peso corporal', 3, '10-15', { category: 'Calistenia', secondaryMuscles: ['Pecho'], restSeconds: 60 }), exercise('kettlebell-extension', 'Extensión con kettlebell', 'Tríceps', 'Kettlebell', 3, '10-12', { category: 'Kettlebell', restSeconds: 60 }), exercise('band-pushdown', 'Extensión con banda', 'Tríceps', 'Bandas', 3, '12-15', { category: 'Bandas', restSeconds: 60 })],
  Hombros: [exercise('shoulder-press', 'Press militar', 'Hombros', 'Mancuernas', 4, '8-12', { category: 'Pesas libres', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio' }), exercise('lateral-raise', 'Elevaciones laterales', 'Hombros', 'Mancuernas', 4, '12-15', { category: 'Pesas libres', restSeconds: 60 }), exercise('band-pull-apart', 'Pull apart con banda', 'Hombros', 'Bandas', 3, '15-20', { category: 'Bandas', secondaryMuscles: ['Espalda'], restSeconds: 60 }), exercise('kettlebell-press', 'Press con kettlebell', 'Hombros', 'Kettlebell', 4, '8-10', { category: 'Kettlebell', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 90 }), exercise('pike-pushup', 'Flexión pike', 'Hombros', 'Peso corporal', 3, '8-12', { category: 'Calistenia', secondaryMuscles: ['Tríceps'], difficulty: 'Intermedio', restSeconds: 60 })],
  Piernas: [exercise('squat', 'Sentadilla', 'Piernas', 'Barra', 4, '6-10', { category: 'Pesas libres', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 120 }), exercise('leg-press', 'Prensa', 'Piernas', 'Máquina', 3, '10-12', { category: 'Máquinas', restSeconds: 90 }), exercise('leg-curl', 'Curl femoral', 'Piernas', 'Máquina', 3, '12', { category: 'Máquinas', restSeconds: 60 }), exercise('kettlebell-swing', 'Swing con kettlebell', 'Piernas', 'Kettlebell', 4, '12-15', { category: 'Kettlebell', secondaryMuscles: ['Core'], difficulty: 'Intermedio', restSeconds: 90 }), exercise('band-squat', 'Sentadilla con banda', 'Piernas', 'Bandas', 3, '15-20', { category: 'Bandas', restSeconds: 60 }), exercise('lunge', 'Zancadas', 'Piernas', 'Peso corporal', 3, '10-12', { category: 'Calistenia', secondaryMuscles: ['Core'], restSeconds: 60 })],
  Core: [exercise('plank', 'Plancha', 'Core', 'Peso corporal', 3, '45 seg', { category: 'Peso corporal', secondaryMuscles: ['Hombros'], restSeconds: 60 }), exercise('cable-crunch', 'Crunch en polea', 'Core', 'Polea', 3, '12-15', { category: 'Máquinas', restSeconds: 60 }), exercise('band-pallof', 'Pallof press', 'Core', 'Bandas', 3, '10-12', { category: 'Bandas', restSeconds: 60 }), exercise('hanging-knee-raise', 'Elevación de rodillas', 'Core', 'Barra paralela', 3, '8-12', { category: 'Calistenia', difficulty: 'Intermedio', restSeconds: 60 }), exercise('kettlebell-twist', 'Giro ruso con kettlebell', 'Core', 'Kettlebell', 3, '12-15', { category: 'Kettlebell', restSeconds: 60 }), exercise('mountain-climber', 'Mountain climbers', 'Core', 'Peso corporal', 3, '20-30', { category: 'Peso corporal', secondaryMuscles: ['Piernas'], restSeconds: 45 })],
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