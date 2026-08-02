import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

function isValidDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidDailySolutions(solutions) {
  return (
    solutions &&
    ['normal', 'hard', 'easy'].every((mode) =>
      Number.isSafeInteger(solutions[mode]) && solutions[mode] > 0,
    )
  );
}

function dailySolutionFromRow(row) {
  return {
    date: row.solution_date,
    solutions: {
      normal: row.normal_solution_id,
      hard: row.hard_solution_id,
      easy: row.easy_solution_id,
    },
  };
}

router.get('/', async (req, res, next) => {
  const date = req.query.date;
  if (!isValidDate(date)) {
    return res.status(400).json({ error: 'Fecha invalida.' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT solution_date, normal_solution_id, hard_solution_id, easy_solution_id
       FROM daily_solutions WHERE solution_date = ?`,
      [date],
    );
    return res.json({ hasSolution: Boolean(rows[0]), solution: rows[0] ? dailySolutionFromRow(rows[0]) : null });
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { date, solutions } = req.body;
  if (!isValidDate(date) || !isValidDailySolutions(solutions)) {
    return res.status(400).json({ error: 'Solucion diaria invalida.' });
  }

  try {
    await db.execute(
      `INSERT IGNORE INTO daily_solutions
        (solution_date, normal_solution_id, hard_solution_id, easy_solution_id)
       VALUES (?, ?, ?, ?)`,
      [date, solutions.normal, solutions.hard, solutions.easy],
    );
    const [rows] = await db.execute(
      `SELECT solution_date, normal_solution_id, hard_solution_id, easy_solution_id
       FROM daily_solutions WHERE solution_date = ?`,
      [date],
    );
    return res.status(201).json({ solution: dailySolutionFromRow(rows[0]) });
  } catch (error) {
    return next(error);
  }
});

export default router;
