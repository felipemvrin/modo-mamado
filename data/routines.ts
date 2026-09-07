import { Exercise, MuscleGroup, muscleGroups } from '../types/workout';

const exercise = (id: string, name: string, muscleGroup: MuscleGroup, equipment: string, sets: number, reps: string, restSeconds = 90): Exercise => ({
  id, name, muscleGroup, equipment, sets, reps, restSeconds,
  instructions: `Controla el movimiento y mantén la técnica. ${equipment}.`,
});

export const routines: Record<MuscleGroup, Exercise[]> = {
  Pecho: [exercise('bench-press', 'Press de pecho', 'Pecho', 'Barra', 4, '8-12'), exercise('incline-press', 'Press inclinado', 'Pecho', 'Mancuernas', 3, '8-12'), exercise('chest-fly', 'Aperturas', 'Pecho', 'Máquina', 3, '12', 60)],
  Espalda: [exercise('lat-pulldown', 'Jalón al pecho', 'Espalda', 'Polea', 4, '8-12'), exercise('barbell-row', 'Remo con barra', 'Espalda', 'Barra', 4, '8-10'), exercise('face-pull', 'Face pull', 'Espalda', 'Polea', 3, '12-15', 60)],
  Bíceps: [exercise('barbell-curl', 'Curl con barra', 'Bíceps', 'Barra', 4, '8-12'), exercise('incline-curl', 'Curl inclinado', 'Bíceps', 'Mancuernas', 3, '10-12', 60)],
  Tríceps: [exercise('pushdown', 'Extensión en polea', 'Tríceps', 'Polea', 4, '10-12'), exercise('skullcrusher', 'Press francés', 'Tríceps', 'Barra Z', 3, '8-12')],
  Hombros: [exercise('shoulder-press', 'Press militar', 'Hombros', 'Mancuernas', 4, '8-12'), exercise('lateral-raise', 'Elevaciones laterales', 'Hombros', 'Mancuernas', 4, '12-15', 60)],
  Piernas: [exercise('squat', 'Sentadilla', 'Piernas', 'Barra', 4, '6-10', 120), exercise('leg-press', 'Prensa', 'Piernas', 'Máquina', 3, '10-12', 90), exercise('leg-curl', 'Curl femoral', 'Piernas', 'Máquina', 3, '12', 60)],
  Core: [exercise('plank', 'Plancha', 'Core', 'Peso corporal', 3, '45 seg', 60), exercise('cable-crunch', 'Crunch en polea', 'Core', 'Polea', 3, '12-15', 60)],
};

export const defaultMuscle: MuscleGroup = muscleGroups[0];