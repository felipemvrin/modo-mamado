# Roadmap de MODO MAMADO

> Menos pensar. Más entrenar.

Este roadmap se organiza por etapas y ramas. Cada etapa debe terminar con validaciones, documentación actualizada y un Pull Request antes de comenzar la siguiente.

## Estado actual

- Etapas 0 a 3: integradas en `main`.
- Etapa 4: en desarrollo.
- Base disponible: Expo SDK 57, selección múltiple de grupos y persistencia local.
- Rama activa: `chore/stage-0-documentation`.

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

**Estado:** En desarrollo

**Objetivo:** ampliar las opciones de entrenamiento sin incorporar todavía una biblioteca pesada de imágenes o GIFs.

**Implementado en esta rama:**

- Categorías: pesas libres, máquinas, kettlebell, calistenia, bandas y peso corporal.
- Equipamiento tipado y dificultad por ejercicio.
- Músculos secundarios para futuras recomendaciones.
- Ejercicios nuevos de flexiones, remo invertido, fondos, kettlebell, bandas y elevaciones de rodillas.
- Consultas locales por categoría y equipamiento.

**Pendiente:** pantalla de exploración y filtros visuales, sustituciones por equipamiento y repositorio de media.

## Etapas posteriores

1. Sustituciones según el equipamiento disponible.
2. Sustituciones según el equipamiento disponible.
3. Registro de peso, repeticiones reales y progresión.
4. Integración Apple Watch.
5. Media optimizada para ejercicios.

## Regla de avance

No iniciar una etapa posterior hasta que la anterior tenga:

- Código validado.
- Documentación actualizada.
- Commit temático.
- Rama subida.
- Pull Request creado.
