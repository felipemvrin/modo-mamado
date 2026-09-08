# Roadmap de MODO MAMADO

> Menos pensar. Más entrenar.

Este roadmap se organiza por etapas y ramas. Cada etapa debe terminar con validaciones, documentación actualizada y un Pull Request antes de comenzar la siguiente.

## Estado actual

- Etapas 0 a 6: integradas en `main`.
- Etapa 7: en desarrollo.
- Base disponible: Expo SDK 57, selección múltiple de grupos, catálogo con sustituciones por equipamiento, registro de peso/reps con progresión histórica y persistencia local.
- Rama activa: `feat/stage-7-quick-access-media`.

## Etapa 0: Documentación y control del proyecto

**Rama:** `chore/stage-0-documentation`

**Objetivo:** mantener el repositorio alineado con el producto y sus decisiones técnicas.

**Incluye:**

- Roadmap por etapas.
- Arquitectura actual.
- Comandos de desarrollo y validación.
- Convenciones de commits y Pull Requests.

**Criterio de salida:** documentación revisada y PR integrado en `main`.

## Etapa 1: Timer confiable y alertas

**Rama:** `feat/stage-1-timer-alerts`

**Estado:** En desarrollo

**Objetivo:** avisar de forma confiable cuando termina el descanso.

**Incluye:**

- Vibración al llegar a `00:00`.
- Alerta local cuando la app esté en segundo plano.
- Sonido configurable si el dispositivo lo permite.
- Persistencia del timer al cambiar de pantalla o minimizar la app.
- Actualización de documentación y troubleshooting.

**Nota:** Apple Watch requiere una integración nativa o una app companion y queda fuera de esta etapa.

**Implementado en esta rama:**

- Timer basado en una marca de tiempo absoluta para recuperar el restante al volver a la app.
- Notificación local con sonido al finalizar el descanso.
- Vibración háptica al finalizar el descanso en el dispositivo.
- Cancelación y reprogramación de la alerta al saltar o sumar 30 segundos.
- Canal Android dedicado para alertas de descanso.

## Etapa 2: Selección múltiple muscular

**Rama:** `feat/stage-2-multiple-muscle-groups`

**Objetivo:** combinar dos o más grupos en una sesión.

**Incluye:**

- Selección múltiple.
- Rutina combinada.
- Persistencia de todos los grupos entrenados.
- Resumen de grupos trabajados.

La funcionalidad ya existe en `main`; esta rama queda como nombre estándar para futuras mejoras de esta etapa.

## Etapa 3: Historial semanal y recomendaciones

**Rama:** `feat/stage-3-weekly-progress`

**Estado:** En desarrollo

**Objetivo:** mostrar qué se trabajó y orientar la próxima sesión.

**Incluye:**

- Resumen de grupos entrenados durante la semana.
- Fecha de la última sesión por grupo.
- Grupos pendientes o con mayor tiempo de recuperación.
- Recomendación simple de siguiente entrenamiento.
- Registro de ejercicios completados.

**Implementado en esta rama:**

- Resumen de sesiones de la semana actual, comenzando el lunes.
- Estado por grupo: entrenado o pendiente.
- Cantidad de sesiones y tiempo relativo desde la última sesión.
- Recomendación de hasta dos grupos pendientes.

## Etapa 4: Catálogo amplio de ejercicios

**Rama:** `feat/stage-4-exercise-catalog`

**Estado:** Integrada en `main`.

**Objetivo:** ampliar las opciones de entrenamiento sin incorporar todavía una biblioteca pesada de imágenes o GIFs.

**Implementado en esta rama:**

- Categorías: pesas libres, máquinas, kettlebell, calistenia, bandas y peso corporal.
- Equipamiento tipado y dificultad por ejercicio.
- Músculos secundarios para futuras recomendaciones.
- Ejercicios nuevos de flexiones, remo invertido, fondos, kettlebell, bandas y elevaciones de rodillas.
- Consultas locales por categoría y equipamiento.

## Etapa 5: Sustituciones según el equipamiento disponible

**Rama:** `feat/stage-5-equipment-substitutions`

**Estado:** En desarrollo

**Objetivo:** permitir reemplazar un ejercicio por otro equivalente cuando falta equipamiento.

**Incluye:**

- Selector de equipamiento disponible en `Home`.
- Cálculo de sustitutos por grupo muscular y equipamiento disponible.
- Selección manual del sustituto en `Routine` y opción de volver al original.

**Implementado en esta rama:**

- `getSubstitutes` y `getExerciseById` en `data/routines.ts`.
- Estado `availableEquipment` y `substitutions` en `WorkoutStore`.
- Chips de equipamiento en `Home` y modal de sustitución en `Routine`.
- Aplicación de la sustitución elegida durante la ejecución en `Workout`.

**Pendiente:** pantalla de exploración y filtros visuales, repositorio de media.

## Etapa 6: Registro de peso, repeticiones reales y progresión

**Rama:** `feat/stage-6-progress-tracking` y `feat/stage-6-progress-history-view`

**Estado:** Integrada en `main`.

**Objetivo:** registrar lo que realmente se levantó en cada serie y mostrar referencia de la sesión anterior para progresar.

**Incluye:**

- Entrada de peso y repeticiones reales por serie durante el entrenamiento.
- Persistencia local de cada serie registrada, asociada al entrenamiento y al ejercicio.
- Referencia a la última carga registrada para el mismo ejercicio.
- Visualización de progresión histórica por ejercicio.

**Implementado en `main`:**

- Tipo `SetLog` y `CompletedWorkout.setLogs` en `types/workout.ts`.
- Tabla `set_logs`, `getLastSetLog`, `getExercisesWithProgress` y `getProgressionForExercise` en `database/workouts.ts`.
- Estado `setLogs` y acción `logSet` en `WorkoutStore`.
- Campos de peso/reps y aviso "ÚLTIMA VEZ" en `Workout`.
- Sección "PROGRESIÓN POR EJERCICIO" en `History`: chips por ejercicio con registros y lista de sesiones (peso × reps) con indicador de tendencia.

## Etapa 7: Acceso rápido, descanso independiente y catálogo con media

**Rama:** `feat/stage-7-quick-access-media`

**Estado:** En desarrollo

**Objetivo:** acortar el camino a la pantalla de descanso desde `Home` y enriquecer el catálogo con más ejercicios e imágenes de referencia.

**Incluye:**

- Menú de acceso rápido en `Home` para ir directo al temporizador de descanso sin pasar por la selección de grupos.
- Timer de descanso independiente, usable sin una rutina activa, con tiempo de descanso configurable por el usuario.
- Ampliación del catálogo local: más ejercicios por grupo muscular y por categoría.
- Imágenes de referencia por ejercicio (`Exercise.mediaUrl`) mostradas en `Routine` y `Workout`, con assets livianos incluidos en el bundle o cargados bajo demanda.

**Criterio de salida:** documentación actualizada, catálogo ampliado validado con `tsc`, timer de descanso accesible desde `Home` y al menos un ejercicio de referencia con imagen visible en la UI.

**Implementado en esta rama:**

- Pantalla `Timer` (`app/timer.tsx`): temporizador de descanso independiente, sin rutina activa, con presets (30/60/90/120s) y duración personalizada.
- Reutiliza notificación local y feedback háptico de `Workout` al terminar el descanso.
- Acceso rápido en `Home` (ícono junto al historial) que navega directo a `/timer`.

**Pendiente:** ampliar el catálogo de ejercicios e incorporar imágenes de referencia (`Exercise.mediaUrl`).

## Etapas posteriores

1. Integración Apple Watch.
2. Pantalla de exploración y filtros visuales del catálogo completo.

## Regla de avance

No iniciar una etapa posterior hasta que la anterior tenga:

- Código validado.
- Documentación actualizada.
- Commit temático.
- Rama subida.
- Pull Request creado.
