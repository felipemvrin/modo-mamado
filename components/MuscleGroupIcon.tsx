import Svg, { Path } from 'react-native-svg';
import anatomy from '../assets/anatomy/body-parts.json';
import { colors } from '../theme/tokens';
import type { MuscleGroup } from '../types/workout';

type FrontPart = keyof typeof anatomy.front;
type BackPart = keyof typeof anatomy.back;
type MuscleIllustration =
  | { side: 'front'; viewBox: string; highlighted: readonly FrontPart[]; context: readonly FrontPart[] }
  | { side: 'back'; viewBox: string; highlighted: readonly BackPart[]; context: readonly BackPart[] };

const illustrations: Record<MuscleGroup, MuscleIllustration> = {
  Pecho: {
    side: 'front',
    viewBox: '180 290 365 260',
    highlighted: ['chest'],
    context: ['deltoids', 'biceps', 'abs', 'obliques'],
  },
  Espalda: {
    side: 'back',
    viewBox: '910 290 350 365',
    highlighted: ['trapezius', 'upper-back', 'lower-back'],
    context: ['deltoids', 'triceps'],
  },
  Bíceps: {
    side: 'front',
    viewBox: '170 300 125 230',
    highlighted: ['biceps'],
    context: ['deltoids', 'triceps', 'chest'],
  },
  Tríceps: {
    side: 'back',
    viewBox: '895 300 130 245',
    highlighted: ['triceps'],
    context: ['deltoids', 'upper-back'],
  },
  Hombros: {
    side: 'front',
    viewBox: '180 285 365 180',
    highlighted: ['deltoids'],
    context: ['trapezius', 'chest', 'biceps'],
  },
  Piernas: {
    side: 'front',
    viewBox: '230 650 270 615',
    highlighted: ['quadriceps', 'adductors', 'calves', 'tibialis'],
    context: ['knees'],
  },
  Core: {
    side: 'front',
    viewBox: '250 420 225 305',
    highlighted: ['abs', 'obliques'],
    context: ['chest'],
  },
};

export function MuscleGroupIcon({ muscle, selected }: { muscle: MuscleGroup; selected: boolean }) {
  const illustration = illustrations[muscle];
  const highlightedFill = selected ? colors.background : colors.lime;
  const contextFill = selected ? '#718C19' : '#65656F';
  const parts = illustration.side === 'front'
    ? [...illustration.context, ...illustration.highlighted].map((part) => ({
      part,
      paths: anatomy.front[part],
      highlighted: illustration.highlighted.includes(part),
    }))
    : [...illustration.context, ...illustration.highlighted].map((part) => ({
      part,
      paths: anatomy.back[part],
      highlighted: illustration.highlighted.includes(part),
    }));

  return (
    <Svg width={40} height={32} viewBox={illustration.viewBox} aria-hidden={true}>
      {parts.map(({ part, paths, highlighted }) => (
        <Path key={part} d={paths.join(' ')} fill={highlighted ? highlightedFill : contextFill} />
      ))}
    </Svg>
  );
}
