import bcrypt from 'bcryptjs';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { db } from './db.js';
import { requireAuth, signToken } from './middleware/auth.js';
import { GAME_MODES, isValidStats, toStats, validCredentials } from './validation.js';

const app = express();
const port = Number(process.env.PORT ?? 3001);
const corsOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', async (_req, res, next) => {
  try {
    await db.query('SELECT 1');
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/register', async (req, res, next) => {
  const username = req.body.username?.trim();
  const { password } = req.body;

  if (!validCredentials(username, password)) {
    return res.status(400).json({
      error: 'El usuario debe tener entre 3 y 45 caracteres y la contraseña al menos 8.',
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const [result] = await db.execute(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, passwordHash],
    );
    const user = { id: result.insertId, username };

    return res.status(201).json({ user, token: signToken(user) });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Ese nombre de usuario ya existe.' });
    }

    return next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  const username = req.body.username?.trim();
  const { password } = req.body;

  if (!validCredentials(username, password)) {
    return res.status(400).json({ error: 'Credenciales invalidas.' });
  }

  try {
    const [users] = await db.execute(
      'SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1',
      [username],
    );
    const user = users[0];
    const validPassword = user && (await bcrypt.compare(password, user.password_hash));

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales invalidas.' });
    }

    const publicUser = { id: user.id, username: user.username };
    return res.json({ user: publicUser, token: signToken(publicUser) });
  } catch (error) {
    return next(error);
  }
});

app.get('/api/users/:userId/stats', requireAuth, async (req, res, next) => {
  const userId = Number(req.params.userId);
  const gameMode = req.query.mode ?? 'normal';

  if (!Number.isSafeInteger(userId) || userId !== Number(req.user.sub)) {
    return res.status(403).json({ error: 'No puedes ver las estadisticas de otro usuario.' });
  }
  if (!GAME_MODES.includes(gameMode)) {
    return res.status(400).json({ error: 'Modo de juego invalido.' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT played, wins, current_streak, best_streak, distribution
       FROM stats WHERE user_id = ? AND game_mode = ?`,
      [userId, gameMode],
    );
    return res.json({
      userId,
      gameMode,
      hasStats: Boolean(rows[0]),
      stats: toStats(rows[0] ?? null),
    });
  } catch (error) {
    return next(error);
  }
});

app.put('/api/users/:userId/stats', requireAuth, async (req, res, next) => {
  const userId = Number(req.params.userId);
  const { gameMode, stats } = req.body;

  if (!Number.isSafeInteger(userId) || userId !== Number(req.user.sub)) {
    return res.status(403).json({ error: 'No puedes modificar las estadisticas de otro usuario.' });
  }
  if (!GAME_MODES.includes(gameMode) || !isValidStats(stats)) {
    return res.status(400).json({ error: 'Estadisticas o modo de juego invalidos.' });
  }

  try {
    await db.execute(
      `INSERT INTO stats
        (user_id, game_mode, played, wins, current_streak, best_streak, distribution)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        played = VALUES(played),
        wins = VALUES(wins),
        current_streak = VALUES(current_streak),
        best_streak = VALUES(best_streak),
        distribution = VALUES(distribution)`,
      [
        userId,
        gameMode,
        stats.played,
        stats.wins,
        stats.currentStreak,
        stats.bestStreak,
        JSON.stringify(stats.distribution),
      ],
    );
    return res.json({ userId, gameMode, stats });
  } catch (error) {
    return next(error);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

app.listen(port, () => {
  console.log(`API disponible en http://localhost:${port}/api`);
});

export { app };
