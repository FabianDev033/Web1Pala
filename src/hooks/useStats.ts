import { useState, useEffect } from 'react';
import { loadStats, saveStats } from '../utils/storage';
import type { Stats } from '../types/stats';
export function useStats(gamemode: 'normal' | 'easy' | 'hard') {
  const STORAGE_KEY = `stats-${gamemode}`;

  const [stats, setStats] = useState<Stats>(() => loadStats(STORAGE_KEY));

  useEffect(() => {
    setStats(loadStats(STORAGE_KEY));
  }, [STORAGE_KEY]);

  useEffect(() => {
    saveStats(STORAGE_KEY, stats);
  }, [STORAGE_KEY, stats]);

  const registerWin = (tries: number) => {
    setStats((prev) => {
      const distribution = [...prev.distribution];
      distribution[tries - 1] += 1;

      return {
        played: prev.played + 1,
        wins: prev.wins + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
        distribution,
      };
    });
  };

  const registerLoss = () => {
    setStats((prev) => ({
      ...prev,
      played: prev.played + 1,
      currentStreak: 0,
    }));
  };

  return { stats, registerWin, registerLoss };
}
