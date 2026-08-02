import { request } from './api';

type GameMode = 'normal' | 'hard' | 'easy';
type DailySolutionIds = Record<GameMode, number>;

export type DailySolution = {
  date: string;
  solutions: DailySolutionIds;
};

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
