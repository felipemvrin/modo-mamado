# Roadmap de MODO MAMADO

> Menos pensar. Más entrenar.

Este roadmap se organiza por etapas y ramas. Cada etapa debe terminar con validaciones, documentación actualizada y un Pull Request antes de comenzar la siguiente.

## Estado actual

- Etapas 0 a 10: integradas en `main`.
- Etapa 8: completa (42/42 ejercicios con imagen: 37 remotas vía RepDB + 5 propias generadas con IA en `assets/exercises/`).
- Base disponible: Expo SDK 57, selección múltiple de grupos, catálogo de 42 ejercicios (todos con imagen) con sustituciones por equipamiento, timer de descanso independiente, explorador de catálogo con detalle/sustitución, persistencia local del resumen de sesión y contrato de sincronización de sesión para una futura companion.
- Rama activa: `main`.
- Pendiente sin bloquear avance: registro de peso/repeticiones y progresión histórica (ver Etapa 6, reservada) e integración Apple Watch nativa (fuera de alcance de Expo/React Native puro).

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

**Estado:** Integrada en `main`.

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

**Estado:** Integrada en `main`.

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

**Estado:** Integrada en `main`.

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

**Estado:** Reservada para una etapa futura.

**Objetivo:** registrar lo que realmente se levantó en cada serie y mostrar referencia de la sesión anterior para progresar.

**Incluye:**

- Entrada de peso y repeticiones reales por serie durante el entrenamiento.
- Persistencia local de cada serie registrada, asociada al entrenamiento y al ejercicio.
- Referencia a la última carga registrada para el mismo ejercicio.
- Visualización de progresión histórica por ejercicio.

**Implementado en `feat/stage-6-progress-tracking-saved`:**

- Tipo `SetLog` y `CompletedWorkout.setLogs` en `types/workout.ts`.
- Tabla `set_logs`, `getLastSetLog`, `getExercisesWithProgress` y `getProgressionForExercise` en `database/workouts.ts`.
- Estado `setLogs` y acción `logSet` en `WorkoutStore`.
- Campos de peso/reps y aviso "ÚLTIMA VEZ" en `Workout`.
- Sección "PROGRESIÓN POR EJERCICIO" en `History`: chips por ejercicio con registros y lista de sesiones (peso × reps) con indicador de tendencia.

La versión oficial actual mantiene el flujo de entrenamiento simple y solo guarda el resumen de cada sesión.

## Etapa 7: Acceso rápido, descanso independiente y catálogo ampliado

**Rama:** `feat/stage-7-quick-access-media`, `feat/stage-7-exercise-catalog-expansion`

**Estado:** Integrada en `main`.

**Objetivo:** acortar el camino a la pantalla de descanso desde `Home` y enriquecer el catálogo con más ejercicios.

**Incluye:**

- Menú de acceso rápido en `Home` para ir directo al temporizador de descanso sin pasar por la selección de grupos.
- Timer de descanso independiente, usable sin una rutina activa, con tiempo de descanso configurable por el usuario.
- Ampliación del catálogo local: más ejercicios por grupo muscular y por categoría.

**Nota:** las imágenes de referencia por ejercicio se movieron a la Etapa 8 por un tema de licencias de las fuentes disponibles (ver esa etapa).

**Implementado en esta rama:**

- Pantalla `Timer` (`app/timer.tsx`): temporizador de descanso independiente, sin rutina activa, con presets (30/60/90/120s) y duración personalizada.
- Reutiliza notificación local y feedback háptico de `Workout` al terminar el descanso.
- Acceso rápido en `Home` (ícono junto al historial) que navega directo a `/timer`.
- Catálogo local ampliado a 6 ejercicios por grupo muscular (42 en total), sumando variantes en polea, bandas, kettlebell, barra paralela y peso corporal para mejorar la cobertura de sustituciones por equipamiento.

## Etapa 8: Imágenes de referencia por ejercicio

**Rama:** `feat/stage-7-exercise-media` (placeholder), `feat/stage-8-exercise-images`, `feat/stage-8-exercise-images-remaining`, `feat/stage-8-exercise-images-final`

**Estado:** Integrada en `main`.

**Objetivo:** mostrar una imagen de referencia por ejercicio en `Routine` y `Workout`, usando únicamente fuentes con licencia libre o de uso permitido, sin depender de media con copyright de terceros.

**Nota sobre licencias:**

- Se descartó [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset): código/metadata MIT, pero imágenes y GIFs © Gym visual, que exige licencia propia antes de reutilizar esa media.
- Se adoptó [RepDB/exercise-dataset](https://github.com/RepDB/exercise-dataset) (free tier): uso personal y comercial en apps permitido, **solo requiere atribución visible** ("Exercise data by RepDB (repdb.co)"). No se puede redistribuir como dataset/API, solo usar dentro de la app.

**Implementado en `feat/stage-7-exercise-media`:**

- `Exercise.mediaUrl` (ya existía) se renderiza como imagen en `Routine` (miniatura por fila) y `Workout` (miniatura del ejercicio actual).
- Placeholder (ícono `image-off-outline`) y manejo de error de carga cuando el ejercicio aún no tiene `mediaUrl` o la imagen falla.

**Implementado en `feat/stage-8-exercise-images`:**

- `mediaId` + helper `repdbImage()` en `data/routines.ts`, apuntando a `https://exercise-dataset.com/images/flat/<id>-start.webp`.
- **24 de 42 ejercicios** verificados uno por uno contra el dataset real de RepDB y con imagen asignada.
- Atribución visible "Ilustraciones de ejercicio: RepDB (repdb.co)" agregada al pie de `History` (requisito de la licencia gratuita).

**Implementado en `feat/stage-8-exercise-images-remaining`:**

- 6 ejercicios adicionales verificados y mapeados: Sentadilla (`squat`), Sentadilla con banda (`banded-squat`), Zancadas (`lunge`), Pallof press (`cable-pallof-press`), Giro ruso con kettlebell (`kettlebell-russian-twist`), Extensión con kettlebell (`kettlebell-skull-crusher`).
- Total actual: **36 de 42 ejercicios** con imagen.

**Implementado en `feat/stage-8-exercise-images-final`:**

- Curl con kettlebell → `kettlebell-hammer-curl`.
- Total: **37 de 42 ejercicios** con imagen remota (RepDB).

**Implementado en `feat/stage-8-local-exercise-media`:**

- Imágenes propias generadas con IA para los 5 ejercicios sin coincidencia en RepDB, guardadas en `assets/exercises/` e incluidas en el bundle (`Exercise.mediaSource` vía `require()`).
- `Routine`, `Workout` y `Explore` priorizan `mediaSource` (local) sobre `mediaUrl` (remoto) al renderizar la miniatura.
- **Total final: 42 de 42 ejercicios con imagen.**

**Estado final:** catálogo completo con imagen. Sin pendientes.

## Etapa 9: Pantalla de exploración y filtros visuales del catálogo

**Rama:** `feat/stage-9-catalog-explorer`, `feat/stage-9-exercise-detail`

**Estado:** Integrada en `main`.

**Objetivo:** dejar navegar el catálogo completo (42 ejercicios) fuera del flujo de selección de grupos, con búsqueda y filtros.

**Incluye:**

- Pantalla `Explore` (`app/explore.tsx`) con buscador por nombre y filtros por grupo muscular, categoría, equipamiento y dificultad (combinables).
- Miniatura por ejercicio (imagen real o placeholder) reutilizando `Exercise.mediaUrl`.
- Acceso rápido en `Home` (ícono de lupa junto a timer/historial).

**Implementado en esta rama:**

- `app/explore.tsx`: filtros por chips seleccionables, búsqueda en vivo, contador de resultados y botón "limpiar filtros".
- Ícono de acceso en `Home` que navega a `/explore`.

**Implementado en `feat/stage-9-exercise-detail`:**

- Modal de detalle al tocar una tarjeta: imagen, músculos, categoría/equipamiento/dificultad, series/reps/descanso e instrucciones.
- Sustitutos disponibles (`getSubstitutes`) filtrados por equipamiento, con opción de fijar sustitución y volver al original — comparte el mismo estado `substitutions` que `Routine`.

## Etapa 10: Preparación para Apple Watch

**Rama sugerida:** `feat/stage-10-watch-companion`

**Objetivo:** dejar la lógica del entrenamiento y las notificaciones preparada para una futura app companion de Apple Watch sin bloquear el flujo actual de iPhone.

**Incluye:**

- Separar la lógica de sesión, descanso y progreso del UI para reutilizarla en una app nativa o companion.
- Aislar eventos de entrenamiento y notificaciones en un dominio portable y reutilizable.
- Definir qué métricas se comunicarán con Watch: grupo muscular actual, serie en curso, tiempo de descanso, indicador de fin de sesión.
- Preparar una API de estado mínima para sincronizar la app principal con la companion.

**Nota:** la integración real requiere un proyecto WatchKit o app companion nativa; no se considera parte del alcance de esta app Expo/React Native puro.

**Implementado en `main`:**

- Dominio portable para construir snapshots de sesión sin depender de la UI.
- Payload versionado para el estado actual, descanso, progreso y ejercicio siguiente.
- Transporte validado mediante serialización JSON y adaptador en memoria sustituible por una implementación nativa.
- Publicación desde `Workout` evitando snapshots redundantes.

**Estado:** Preparada para integración nativa; la app companion real queda pendiente.

## Etapas posteriores

1. Integración Apple Watch (requiere app companion o integración nativa; fuera de alcance de este proyecto Expo/React Native puro).

## Regla de avance

No iniciar una etapa posterior hasta que la anterior tenga:

- Código validado.
- Documentación actualizada.
- Commit temático.
- Rama subida.
- Pull Request creado.
