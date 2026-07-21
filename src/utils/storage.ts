export function loadStats(key: string) {
  const json = localStorage.getItem(key);

  if (!json) {
    return {
      played: 0,
      wins: 0,
      currentStreak: 0,
      bestStreak: 0,
      distribution: [0, 0, 0, 0, 0, 0],
    };
  }

  return JSON.parse(json);
}

export function saveStats(key: string, stats: any) {
  localStorage.setItem(key, JSON.stringify(stats));
}
