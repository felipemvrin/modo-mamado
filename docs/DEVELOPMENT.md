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
