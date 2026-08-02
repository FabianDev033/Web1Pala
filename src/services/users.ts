import type { Stats } from '../types/stats';
import { getSession, type AuthSession } from '../utils/auth';
import { request } from './api';

type GameMode = 'normal' | 'hard' | 'easy';
type DailyGameResult = 'win' | 'loss';

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

export async function saveDailyGame(gameMode: GameMode, result: DailyGameResult, tries: number | null) {
  const session = getSession();
  if (!session) return;

  await request(`/users/${session.user.id}/daily-games`, {
    method: 'PUT',
    headers: authenticatedHeaders(session),
    body: JSON.stringify({ gameMode, result, tries }),
  });
}
