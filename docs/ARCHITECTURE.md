# Arquitectura actual

## Capas

```text
app/          Pantallas y navegación Expo Router
components/   Componentes reutilizables de UI
 data/        Rutinas y catálogo local
 database/    SQLite y repositorios de persistencia
 store/       Estado de sesión con Zustand
 theme/       Tokens visuales
 types/       Contratos del dominio
```

## Flujo principal

```text
Home
  -> selección de uno o más grupos
  -> Routine
  -> Workout
  -> descanso automático
  -> historial local
```

## Dominio

- `MuscleGroup` representa un grupo muscular válido.
- `Exercise` es el contrato interno de un ejercicio e incluye categoría, equipamiento, dificultad y músculos secundarios.
- `CompletedWorkout` guarda los grupos trabajados, fecha y cantidad de ejercicios.
- Las rutinas se resuelven localmente y la UI no depende de un dataset externo.

## Estado

`WorkoutStore` controla:

- grupos seleccionados;
- sesión activa;
- series completadas;
- historial cargado desde SQLite;
- equipamiento disponible hoy;
- sustituciones de ejercicio activas (mapa id original -> id sustituto);
- registros de peso/repeticiones de la serie en curso (`setLogs`).

Las alertas y el tiempo restante deben vivir en una capa de timer separada cuando se implemente la etapa 1. No mezclar notificaciones con componentes de presentación.

## Sustituciones

- `getSubstitutes(exercise, availableEquipment?)` en `data/routines.ts` busca ejercicios del mismo `muscleGroup` con distinto `equipment`, filtrando por el equipamiento marcado como disponible.
- `Routine` resuelve cada ejercicio contra `substitutions` antes de renderizarlo, sin alterar el catálogo base.
- El equipamiento disponible se marca en `Home` y persiste en memoria durante la sesión (no en SQLite).

## Persistencia

SQLite mantiene dos tablas locales.

`workouts`:

- `id`;
- `muscle_group`;
- `completed_at`;
- `exercise_count`.

`set_logs` (una fila por serie registrada):

- `workout_id`;
- `exercise_id`;
- `set_index`;
- `weight`;
- `reps`;
- `completed_at`.

`getLastSetLog(exerciseId)` consulta la serie más reciente de un ejercicio para mostrar referencia de progresión. Los cambios de esquema futuros deben incluir una migración explícita y una nota en este documento.

## Decisiones de diseño

- Offline-first para el MVP.
- Tokens propios en `theme/`.
- Expo Router para navegación basada en archivos.
- Dependencias nativas compatibles con Expo SDK 57.
- Sin backend, login o red social en esta fase.

## Catálogo de ejercicios

`data/routines.ts` mantiene un catálogo local pequeño y reutilizable:

- `allExercises` devuelve el catálogo completo.
- `getExercisesByCategory` filtra por modalidad.
- `getExercisesByEquipment` filtra por equipamiento.
- `Exercise.mediaUrl` (remoto, RepDB) o `Exercise.mediaSource` (local, `require()` desde `assets/exercises/`) provee la miniatura; `mediaSource` tiene prioridad cuando ambos existen. Las 42 ejercicios del catálogo tienen imagen.
- `app/explore.tsx` permite buscar y filtrar el catálogo completo, con detalle y sustitución por ejercicio.

