import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { db } from './db.js';
import authRoutes from './routes/auth.js';
import dailySolutionsRoutes from './routes/dailySolutions.js';
import usersRoutes from './routes/users.js';

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

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/daily-solutions', dailySolutionsRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

app.listen(port, () => {
  console.log(`API disponible en http://localhost:${port}/api`);
});

export { app };
