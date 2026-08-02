import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { GAME_MODES, isValidStats, toStats } from '../validation.js';

const router = Router();

function authorizedUserId(req, res) {
  const userId = Number(req.params.userId);
  if (!Number.isSafeInteger(userId) || userId !== Number(req.user.sub)) {
    res.status(403).json({ error: 'No puedes acceder a los datos de otro usuario.' });
    return null;
  }
  return userId;
}

router.use(requireAuth);

router.get('/:userId/stats', async (req, res, next) => {
  const userId = authorizedUserId(req, res);
  const gameMode = req.query.mode ?? 'normal';
  if (!userId) return;
  if (!GAME_MODES.includes(gameMode)) {
    return res.status(400).json({ error: 'Modo de juego invalido.' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT played, wins, current_streak, best_streak, distribution
       FROM stats WHERE user_id = ? AND game_mode = ?`,
      [userId, gameMode],
    );
    return res.json({ userId, gameMode, hasStats: Boolean(rows[0]), stats: toStats(rows[0] ?? null) });
  } catch (error) {
    return next(error);
  }
});

router.put('/:userId/stats', async (req, res, next) => {
  const userId = authorizedUserId(req, res);
  const { gameMode, stats } = req.body;
  if (!userId) return;
  if (!GAME_MODES.includes(gameMode) || !isValidStats(stats)) {
    return res.status(400).json({ error: 'Estadisticas o modo de juego invalidos.' });
  }

  try {
    await db.execute(
      `INSERT INTO stats (user_id, game_mode, played, wins, current_streak, best_streak, distribution)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE played = VALUES(played), wins = VALUES(wins),
        current_streak = VALUES(current_streak), best_streak = VALUES(best_streak),
        distribution = VALUES(distribution)`,
      [userId, gameMode, stats.played, stats.wins, stats.currentStreak, stats.bestStreak, JSON.stringify(stats.distribution)],
    );
    return res.json({ userId, gameMode, stats });
  } catch (error) {
    return next(error);
  }
});

router.get('/:userId/daily-games', async (req, res, next) => {
  const userId = authorizedUserId(req, res);
  const gameMode = req.query.mode ?? 'normal';
  if (!userId) return;
  if (!GAME_MODES.includes(gameMode)) {
    return res.status(400).json({ error: 'Modo de juego invalido.' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT result, tries FROM daily_game_results
       WHERE user_id = ? AND game_mode = ? AND game_date = CURRENT_DATE`,
      [userId, gameMode],
    );
    return res.json({ hasPlayed: Boolean(rows[0]), game: rows[0] ?? null });
  } catch (error) {
    return next(error);
  }
});

router.put('/:userId/daily-games', async (req, res, next) => {
  const userId = authorizedUserId(req, res);
  const { gameMode, result, tries } = req.body;
  const validResult = result === 'win' || result === 'loss';
  const validTries = tries === null || (Number.isInteger(tries) && tries >= 1 && tries <= 6);
  if (!userId) return;
  if (!GAME_MODES.includes(gameMode) || !validResult || !validTries) {
    return res.status(400).json({ error: 'Resultado de partida invalido.' });
  }

  try {
    await db.execute(
      `INSERT INTO daily_game_results (user_id, game_date, game_mode, result, tries)
       VALUES (?, CURRENT_DATE, ?, ?, ?)
       ON DUPLICATE KEY UPDATE result = VALUES(result), tries = VALUES(tries)`,
      [userId, gameMode, result, tries],
    );
    return res.json({ userId, gameMode, result, tries });
  } catch (error) {
    return next(error);
  }
});

export default router;
