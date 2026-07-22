import { useState, useEffect, useRef } from 'react';
import { loadStats, saveStats } from '../utils/storage';
import type { Stats } from '../types/stats';
import { fetchStats, syncStats } from '../services/api';
import { useAuthSession } from './useAuthSession';

export function useStats(gamemode: 'normal' | 'easy' | 'hard') {
  const STORAGE_KEY = `stats-${gamemode}`;

  const [stats, setStats] = useState<Stats>(() => loadStats(STORAGE_KEY));
  const statsRef = useRef(stats);
  const session = useAuthSession();

  useEffect(() => {
    const localStats = loadStats(STORAGE_KEY);
    statsRef.current = localStats;
    setStats(localStats);
  }, [STORAGE_KEY]);

  useEffect(() => {
    saveStats(STORAGE_KEY, stats);
    statsRef.current = stats;
  }, [STORAGE_KEY, stats]);

  useEffect(() => {
    let cancelled = false;

    void fetchStats(gamemode)
      .then((remoteStats) => {
        if (!remoteStats || cancelled) return;
        statsRef.current = remoteStats;
        saveStats(STORAGE_KEY, remoteStats);
        setStats(remoteStats);
      })
      .catch(() => {
        // Sin conexion, el juego sigue usando localStorage.
      });

    return () => {
      cancelled = true;
    };
  }, [STORAGE_KEY, gamemode, session?.user.id]);

  const applyStats = (update: (previous: Stats) => Stats) => {
    const next = update(statsRef.current);
    statsRef.current = next;
    saveStats(STORAGE_KEY, next);
    setStats(next);
    void syncStats(gamemode, next).catch(() => {
      // No interrumpir la partida si la API no esta disponible.
    });
  };

  const registerWin = (tries: number) => {
    applyStats((previous) => {
      const distribution = [...previous.distribution];
      distribution[tries - 1] += 1;

      return {
        played: previous.played + 1,
        wins: previous.wins + 1,
        currentStreak: previous.currentStreak + 1,
        bestStreak: Math.max(previous.bestStreak, previous.currentStreak + 1),
        distribution,
      };
    });
  };

  const registerLoss = () => {
    applyStats((previous) => ({
      ...previous,
      played: previous.played + 1,
      currentStreak: 0,
    }));
  };

  return { stats, registerWin, registerLoss };
}
