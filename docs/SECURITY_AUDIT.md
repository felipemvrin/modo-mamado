# Auditoría de seguridad — Modo Mamado

Fecha: 2026-09-22

## Contexto de arquitectura
- App 100% local (Expo/React Native), sin backend propio, sin endpoints propios y sin autenticación de usuarios.
- Persistencia local vía SQLite (`database/workouts.ts`).
- Única llamada de red: imágenes estáticas de ejercicios vía HTTPS (`https://exercise-dataset.com`).
- Sincronización con Watch es local/en memoria (`domain/watch-sync.ts`), sin red externa.

## Resultado por categoría

| Categoría | Estado | Detalle |
|---|---|---|
| Rate limiting | No aplica | No hay API propia ni servidor. |
| API keys | OK | Sin secretos hardcodeados. `.gitignore` excluye certificados/llaves nativas (`*.p8`, `*.p12`, `*.key`, `*.mobileprovision`, `*.jks`). |
| RLS | No aplica | No hay base de datos multiusuario ni servidor. |
| Variables de entorno | OK | Solo `EXPO_PUBLIC_MINIMAL_DIAGNOSTIC` (no sensible). Sin `.env` commiteado. |
| Validación de inputs | OK | `domain/watch-sync.ts` valida tipo, rango y consistencia de payloads externos antes de usarlos. |
| Bases de datos | OK | `database/workouts.ts` usa consultas parametrizadas (sin concatenación de strings, sin SQL injection). |
| Autenticación | No aplica | Sin cuentas de usuario ni sesiones. |
| Errores sin exponer datos | OK | `ErrorBoundary` solo muestra `error.message` en `__DEV__`; producción ve mensaje genérico. `services/notifications.ts` usa `try/catch` silencioso. |
| Endpoints | No aplica | Sin backend propio. |
| Registro de ataques | No aplica | Sin servidor que loguear. |

## Hallazgos y recomendaciones

1. **IDs de `CompletedWorkout` basados en `Date.now()`** (`store/workout.ts`): riesgo de colisión si dos guardados ocurren en el mismo milisegundo (`INSERT OR REPLACE` sobrescribiría uno). No es una vulnerabilidad de seguridad, pero sí de integridad de datos.
   - Recomendación: usar `crypto.randomUUID()` o un ID compuesto (timestamp + contador/random).

2. **`NSAllowsLocalNetworking: true`** en `ios/ModoMamado/Info.plist`: habilitado por Expo para desarrollo (Metro). Bajo riesgo real en producción.
   - Recomendación: revisar si se puede desactivar en builds 100% release sin necesidad de debug local.

3. **`aps-environment: development`** en `ios/ModoMamado/ModoMamado.entitlements`: EAS Build debería sobrescribir esto a `production` al firmar para App Store.
   - Recomendación: confirmar con `eas credentials` antes de cada publicación que el certificado de producción esté en uso.

4. **`npm audit`: 13 vulnerabilidades moderadas**, todas en herramientas de build (`@expo/cli`, `@expo/config-plugins`, `uuid`, `query-string`). No se empaquetan en el binario final del cliente.
   - Recomendación: monitorear, no requiere acción urgente. Evaluar en el próximo salto mayor de Expo SDK/CLI.

## Notas para el futuro
Si se agrega un backend (sync en la nube, cuentas de usuario, telemetría):
- Definir rate limiting y RLS en ese momento.
- Usar EAS Secrets para credenciales sensibles, nunca variables `EXPO_PUBLIC_*`.
- Agregar registro de intentos fallidos/anómalos en el backend.
- Revisar consentimiento y minimización de datos antes de enviar telemetría/crash reports (ej. Sentry).
