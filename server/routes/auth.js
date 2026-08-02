import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { db } from '../db.js';
import { signToken } from '../middleware/auth.js';
import { validCredentials } from '../validation.js';

const router = Router();

router.post('/register', async (req, res, next) => {
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

router.post('/login', async (req, res, next) => {
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

export default router;
