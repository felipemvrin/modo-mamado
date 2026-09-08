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
- historial cargado desde SQLite.

Las alertas y el tiempo restante deben vivir en una capa de timer separada cuando se implemente la etapa 1. No mezclar notificaciones con componentes de presentación.

## Persistencia

SQLite mantiene una tabla local de entrenamientos. Las columnas principales son:

- `id`;
- `muscle_group`;
- `completed_at`;
- `exercise_count`.

Los cambios de esquema futuros deben incluir una migración explícita y una nota en este documento.

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

La pantalla de exploración y las demostraciones multimedia se incorporarán después. El bundle no incluye GIFs masivos.
