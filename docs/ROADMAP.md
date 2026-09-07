# Roadmap de MODO MAMADO

> Menos pensar. Más entrenar.

Este roadmap se organiza por etapas y ramas. Cada etapa debe terminar con validaciones, documentación actualizada y un Pull Request antes de comenzar la siguiente.

## Estado actual

- Etapas 0 a 3: planificadas para esta secuencia de evolución.
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

**Objetivo:** avisar de forma confiable cuando termina el descanso.

**Incluye:**

- Vibración al llegar a `00:00`.
- Alerta local cuando la app esté en segundo plano.
- Sonido configurable si el dispositivo lo permite.
- Persistencia del timer al cambiar de pantalla o minimizar la app.
- Actualización de documentación y troubleshooting.

**Nota:** Apple Watch requiere una integración nativa o una app companion y queda fuera de esta etapa.

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

**Objetivo:** mostrar qué se trabajó y orientar la próxima sesión.

**Incluye:**

- Resumen de grupos entrenados durante la semana.
- Fecha de la última sesión por grupo.
- Grupos pendientes o con mayor tiempo de recuperación.
- Recomendación simple de siguiente entrenamiento.
- Registro de ejercicios completados.

## Etapas posteriores

1. Catálogo amplio de ejercicios y filtros por equipamiento.
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
