# MODO MAMADO

> Menos pensar. Más entrenar.

MODO MAMADO es un copiloto de entrenamiento offline-first para gimnasio. Te dice qué entrenar, qué serie toca y cuándo volver a darle.

## MVP

- Selección visual de grupo muscular.
- Rutinas locales de pecho, espalda, brazos, hombros, piernas y core.
- Sesión guiada con series, repeticiones y progreso.
- Descanso automático con cronómetro grande, +30 segundos, saltar y feedback háptico.
- Historial local de entrenamientos con Expo SQLite.
- Tipografía Quantico, iconografía consistente y diseño oscuro de alto contraste.

## Stack

- Expo SDK 54, React Native 0.81 y TypeScript estricto.
- Expo Router para navegación basada en archivos.
- Zustand para el estado de la sesión.
- Expo SQLite para persistencia local.
- Expo Haptics, Expo Font y MaterialCommunityIcons.

## Arquitectura

```text
app/          Pantallas y navegación Expo Router
data/         Rutinas locales
database/     Inicialización y repositorio SQLite
store/        Estado de la sesión con Zustand
theme/        Tokens visuales centralizados
types/        Contratos internos del dominio
```

La UI depende de los tipos propios `Exercise` y `MuscleGroup`, no de un dataset externo. Esto deja preparado un futuro `DatasetExerciseRepository` sin acoplar la aplicación a su formato.

## Ejecutar

```bash
npm install
npm start
```

Escanea el QR con Expo Go o usa `npm run ios` para abrir el simulador. No se requiere Android Studio para el flujo con iPhone físico.

## Validación

```bash
npx tsc --noEmit
npx expo export --platform ios
```

## Roadmap

1. Media de ejercicios con un repositorio local pequeño.
2. Ajustes de presets de descanso y reduced motion.
3. Migraciones SQLite versionadas y más métricas de historial.
4. Tests de store, timer y navegación.
