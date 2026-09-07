# Desarrollo

## Requisitos

- Node.js compatible con Expo SDK 57.
- Expo Go SDK 57 para probar en iPhone.
- VS Code.
- iPhone y Mac en la misma red Wi-Fi para conexión LAN.

## Instalar y ejecutar

```bash
npm install
npx expo start --lan
```

Para limpiar la caché:

```bash
npx expo start -c
```

## Validaciones obligatorias

```bash
npx tsc --noEmit
npx expo export --platform ios
```

## Flujo de ramas

Cada etapa tiene su propia rama:

```bash
git switch main
git pull --ff-only
git switch -c chore/stage-0-documentation
```

Después de completar una etapa:

```bash
git status
git diff --check
npx tsc --noEmit
git add <archivos-de-la-etapa>
git commit -m "<tipo>: <cambio>"
git push -u origin <rama>
gh pr create --base main --head <rama>
```

Las ramas siguientes se crean después de integrar el PR anterior, siempre desde `main` actualizada.

## Convenciones de commits

- `feat:` funcionalidad nueva.
- `fix:` corrección de comportamiento.
- `chore:` configuración o mantenimiento.
- `docs:` documentación.
- `refactor:` reorganización sin cambiar comportamiento.

## Comprobación manual mínima

1. Abrir Home.
2. Seleccionar uno o más grupos.
3. Revisar la rutina combinada.
4. Completar una serie y esperar el descanso.
5. Terminar la sesión.
6. Confirmar que aparece en Historial.
7. Revisar que el grupo trabajado aparezca como realizado durante la semana.

## Prueba de Stage 1: alertas de descanso

Las notificaciones locales funcionan en Expo Go. Las notificaciones remotas y la integración con Apple Watch requieren una development build.

1. Iniciar la app con `npx expo start --lan`.
2. Abrirla en el iPhone y aceptar permisos de notificaciones.
3. Iniciar una rutina y completar una serie.
4. Confirmar la vibración y la alerta al terminar el descanso.
5. Durante otro descanso, enviar la app a segundo plano y confirmar que la alerta aparece.
6. Pulsar `+30 SEG` y comprobar que la alerta se retrasa.
7. Pulsar `SALTAR DESCANSO` y confirmar que no llega la alerta cancelada.

En iOS, la vibración háptica depende de que el Taptic Engine esté habilitado, que el modo de bajo consumo esté desactivado y que Expo Go tenga permitido emitir sonidos y notificaciones. Con la app activa se ejecutan tres impulsos fuertes durante aproximadamente un segundo. Cuando la app está en segundo plano, la vibración pertenece al sistema de notificaciones de iOS; la app no puede forzar su duración desde JavaScript mientras está suspendida. El sonido usa el volumen de alertas del sistema y no puede amplificarse desde la app.
