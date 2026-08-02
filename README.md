# La pala del día

Juego React/Vite con una API Node + Express para registrar usuarios y conservar sus estadísticas en MySQL.

## Puesta en marcha

1. Copiá `.env.example` a `.env` y completá la contraseña de MySQL y un `JWT_SECRET` largo y aleatorio.
2. Creá las tablas nuevas con `mysql -u root -p < server/database/schema.sql`.
3. En una terminal ejecutá `pnpm dev:api` y en otra `pnpm dev`.

La base indicada en `boludez.sql` no admite hashes bcrypt ni distribuciones de intentos: usá `server/database/schema.sql` para crear el esquema actualizado. Si ya cargaste ese dump, recreá esa base antes de importar el nuevo esquema.

## Endpoints

Todas las rutas reciben y responden JSON. Las rutas de estadísticas requieren el encabezado `Authorization: Bearer <token>` y sólo permiten acceder al usuario incluido en ese token.

| Método | Ruta | Cuerpo / resultado |
| --- | --- | --- |
| `GET` | `/api/health` | Comprueba conexión con MySQL. |
| `POST` | `/api/auth/register` | `{ "username", "password" }`; crea el usuario, genera su hash y devuelve `{ user, token }`. |
| `POST` | `/api/auth/login` | `{ "username", "password" }`; devuelve `{ user, token }`. |
| `GET` | `/api/users/:userId/stats?mode=normal` | Devuelve las estadísticas del usuario y modo (`normal`, `hard` o `easy`). |
| `PUT` | `/api/users/:userId/stats` | Guarda el estado completo de un modo; inserta o actualiza el registro. |
| `GET` | `/api/daily-solutions?date=YYYY-MM-DD` | Devuelve las soluciones de la fecha si ya fueron generadas. |
| `POST` | `/api/daily-solutions` | Guarda las soluciones iniciales de la fecha y devuelve la definitiva. |

Ejemplo del cuerpo del `PUT`:

```json
{
  "gameMode": "normal",
  "stats": {
    "played": 8,
    "wins": 5,
    "currentStreak": 2,
    "bestStreak": 3,
    "distribution": [0, 1, 2, 1, 1, 0]
  }
}
```

## Integración del cliente

`src/services/api.ts` expone `register(username, password)` y `login(username, password)`. Ambas guardan el token y el usuario en `localStorage` mediante `src/utils/auth.ts`; conectalas a los campos de registro/inicio de sesión de la interfaz cuando los agregues.

Al existir esa sesión, `useStats` trae las estadísticas de la base al cargar cada modo y ejecuta el `PUT` automáticamente después de una victoria o derrota. Sin sesión o sin API disponible mantiene el comportamiento local actual.
