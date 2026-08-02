import { useEffect, useState } from 'react';
import { SOLUTIONS, SOLUTIONS_EASY, SOLUTIONS_HARD } from '../data';
import { createDailySolution, fetchDailySolution } from '../services/api';

type Solution = { id: number; word: string; description: string };

function getTodayKey() {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');
}

function randomSolution(solutions: Solution[]) {
  return solutions[Math.floor(Math.random() * solutions.length)];
}

function findSolution(solutions: Solution[], id: number) {
  const solution = solutions.find((item) => item.id === id);
  if (!solution) throw new Error('La solución diaria guardada no existe.');
  return solution;
}

export function useDailySolution() {
  const [solutionNormal, setSolutionNormal] = useState<string | null>(null);
  const [solutionHard, setSolutionHard] = useState<string | null>(null);
  const [solutionEasy, setSolutionEasy] = useState<string | null>(null);
  const [descriptionNormal, setDescriptionNormal] = useState<string | null>(null);
  const [descriptionHard, setDescriptionHard] = useState<string | null>(null);
  const [descriptionEasy, setDescriptionEasy] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const date = getTodayKey();

    const applySolution = (ids: { normal: number; hard: number; easy: number }) => {
      const normal = findSolution(SOLUTIONS, ids.normal);
      const hard = findSolution(SOLUTIONS_HARD, ids.hard);
      const easy = findSolution(SOLUTIONS_EASY, ids.easy);

      if (cancelled) return;
      setSolutionNormal(normal.word);
      setDescriptionNormal(normal.description);
      setSolutionHard(hard.word);
      setDescriptionHard(hard.description);
      setSolutionEasy(easy.word);
      setDescriptionEasy(easy.description);
    };

    void (async () => {
      try {
        let dailySolution = await fetchDailySolution(date);
        if (!dailySolution) {
          dailySolution = await createDailySolution(date, {
            normal: randomSolution(SOLUTIONS).id,
            hard: randomSolution(SOLUTIONS_HARD).id,
            easy: randomSolution(SOLUTIONS_EASY).id,
          });
        }
        applySolution(dailySolution.solutions);
      } catch {
        // Mantiene el juego utilizable si la API no está disponible.
        const fallback = {
          normal: randomSolution(SOLUTIONS),
          hard: randomSolution(SOLUTIONS_HARD),
          easy: randomSolution(SOLUTIONS_EASY),
        };
        if (cancelled) return;
        setSolutionNormal(fallback.normal.word);
        setDescriptionNormal(fallback.normal.description);
        setSolutionHard(fallback.hard.word);
        setDescriptionHard(fallback.hard.description);
        setSolutionEasy(fallback.easy.word);
        setDescriptionEasy(fallback.easy.description);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    solutionNormal,
    solutionHard,
    solutionEasy,
    descriptionNormal,
    descriptionEasy,
    descriptionHard,
  };
}
