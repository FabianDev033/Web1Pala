export const GAME_MODES = ['normal', 'hard', 'easy'];

export const EMPTY_STATS = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  bestStreak: 0,
  distribution: [0, 0, 0, 0, 0, 0],
};

export function validCredentials(username, password) {
  return (
    typeof username === 'string' &&
    username.trim().length >= 3 &&
    username.trim().length <= 45 &&
    typeof password === 'string' &&
    password.length >= 8 &&
    password.length <= 128
  );
}

export function isValidStats(stats) {
  if (!stats || typeof stats !== 'object') return false;

  const counters = [
    stats.played,
    stats.wins,
    stats.currentStreak,
    stats.bestStreak,
  ];

  return (
    counters.every((value) => Number.isInteger(value) && value >= 0) &&
    stats.wins <= stats.played &&
    Array.isArray(stats.distribution) &&
    stats.distribution.length === 6 &&
    stats.distribution.every(
      (value) => Number.isInteger(value) && value >= 0,
    )
  );
}

export function toStats(row) {
  if (!row) return EMPTY_STATS;

  return {
    played: row.played,
    wins: row.wins,
    currentStreak: row.current_streak,
    bestStreak: row.best_streak,
    distribution:
      typeof row.distribution === 'string'
        ? JSON.parse(row.distribution)
        : row.distribution,
  };
}
