import type { Stats } from '../types/stats';
import { getSession, saveSession, type AuthSession } from '../utils/auth';

type GameMode = 'normal' | 'hard' | 'easy';
type DailySolutionIds = Record<GameMode, number>;
type DailyGameResult = 'win' | 'loss';

export type DailySolution = {
  date: string;
  solutions: DailySolutionIds;
};

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Intenta nuevamente.');
  }

  const body = (await response.json()) as T & { error?: string };

  if (!response.ok) throw new Error(body.error ?? 'No se pudo completar la solicitud.');
  return body;
}

async function authenticate(path: string, username: string, password: string) {
  const session = await request<AuthSession>(path, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  saveSession(session);
  return session;
}

export const register = (username: string, password: string) =>
  authenticate('/auth/register', username, password);

export const login = (username: string, password: string) =>
  authenticate('/auth/login', username, password);

function authenticatedHeaders(session: AuthSession) {
  return { Authorization: `Bearer ${session.token}` };
}

export async function fetchStats(gameMode: GameMode): Promise<Stats | null> {
  const session = getSession();
  if (!session) return null;

  const result = await request<{ stats: Stats; hasStats: boolean }>(
    `/users/${session.user.id}/stats?mode=${gameMode}`,
    { headers: authenticatedHeaders(session) },
  );
  return result.hasStats ? result.stats : null;
}

export async function syncStats(gameMode: GameMode, stats: Stats) {
  const session = getSession();
  if (!session) return;

  await request(`/users/${session.user.id}/stats`, {
    method: 'PUT',
    headers: authenticatedHeaders(session),
    body: JSON.stringify({ gameMode, stats }),
  });
}

export async function fetchDailyGame(gameMode: GameMode) {
  const session = getSession();
  if (!session) return null;

  const result = await request<{ hasPlayed: boolean; game: { result: DailyGameResult; tries: number | null } | null }>(
    `/users/${session.user.id}/daily-games?mode=${gameMode}`,
    { headers: authenticatedHeaders(session) },
  );
  return result.hasPlayed ? result.game : null;
}

export async function saveDailyGame(
  gameMode: GameMode,
  result: DailyGameResult,
  tries: number | null,
) {
  const session = getSession();
  if (!session) return;

  await request(`/users/${session.user.id}/daily-games`, {
    method: 'PUT',
    headers: authenticatedHeaders(session),
    body: JSON.stringify({ gameMode, result, tries }),
  });
}

export async function fetchDailySolution(date: string): Promise<DailySolution | null> {
  const result = await request<{ hasSolution: boolean; solution: DailySolution | null }>(
    `/daily-solutions?date=${encodeURIComponent(date)}`,
  );
  return result.hasSolution ? result.solution : null;
}

export async function createDailySolution(
  date: string,
  solutions: DailySolutionIds,
): Promise<DailySolution> {
  const result = await request<{ solution: DailySolution }>('/daily-solutions', {
    method: 'POST',
    body: JSON.stringify({ date, solutions }),
  });
  return result.solution;
}
