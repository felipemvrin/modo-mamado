# MODO MAMADO

> Menos pensar. Más entrenar.

MODO MAMADO es un copiloto de entrenamiento offline-first para gimnasio. Te dice qué entrenar, qué serie toca y cuándo volver a darle.

## MVP

- Selección visual de uno o más grupos musculares.
- Rutinas locales de pecho, espalda, brazos, hombros, piernas y core.
- Sesión guiada con series, repeticiones y progreso.
- Descanso automático con cronómetro grande, +30 segundos, saltar y feedback háptico.
- Historial local de entrenamientos con Expo SQLite.
- Señales de grupos trabajados durante los últimos 7 días.
- Tipografía Quantico, iconografía consistente y diseño oscuro de alto contraste.

## Stack

- Expo SDK 57, React Native 0.86 y TypeScript estricto.
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

El avance está organizado por etapas y ramas. Consulta [docs/ROADMAP.md](docs/ROADMAP.md) para el estado actualizado.

1. Documentación y control del proyecto.
2. Timer confiable, vibración y alertas locales.
3. Selección múltiple muscular.
4. Historial semanal y recomendaciones.
5. Catálogo amplio, filtros y sustituciones.
6. Progresión y preparación para Apple Watch.

La siguiente etapa real del producto es una preparación de arquitectura para una app companion de Apple Watch, con integración nativa fuera del alcance actual de Expo.

Para comandos, validaciones y flujo de ramas consulta [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). Para decisiones técnicas consulta [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
