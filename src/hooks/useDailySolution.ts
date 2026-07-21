import { useEffect, useState } from 'react';
import { SOLUTIONS, SOLUTIONS_EASY, SOLUTIONS_HARD } from '../data';
export function useDailySolution() {
  const [solutionNormal, setSolutionNormal] = useState<string | null>(null);
  const [solutionHard, setSolutionHard] = useState<string | null>(null);
  const [solutionEasy, setSolutionEasy] = useState<string | null>(null);

  const [descriptionNormal, setDescriptionNormal] = useState<string | null>(
    null
  );
  const [descriptionHard, setDescriptionHard] = useState<string | null>(null);
  const [descriptionEasy, setDescriptionEasy] = useState<string | null>(null);

  function getTodayKey() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  useEffect(() => {
    const today = getTodayKey();
    const stored = localStorage.getItem('daily-solution');

    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        setSolutionNormal(SOLUTIONS[data.solution_normal].word);
        setDescriptionNormal(SOLUTIONS[data.solution_normal].description);
        setSolutionHard(SOLUTIONS_HARD[data.solution_hard].word);
        setDescriptionHard(SOLUTIONS_HARD[data.solution_hard].description);
        setSolutionEasy(SOLUTIONS_EASY[data.solution_easy].word);
        setDescriptionEasy(SOLUTIONS_EASY[data.solution_easy].description);
        return;
      }
    }
    const newSolution_NORMAL =
      SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];
    const newSolution_EASY =
      SOLUTIONS_EASY[Math.floor(Math.random() * SOLUTIONS_EASY.length)];
    const newSolution_HARD =
      SOLUTIONS_HARD[Math.floor(Math.random() * SOLUTIONS_HARD.length)];

    const newData = {
      solution_normal: newSolution_NORMAL.id,
      solution_hard: newSolution_HARD.id,
      solution_easy: newSolution_EASY.id,
      date: today,
    };

    localStorage.setItem('daily-solution', JSON.stringify(newData));
    setSolutionNormal(newSolution_NORMAL.word);
    setSolutionHard(newSolution_HARD.word);
    setSolutionEasy(newSolution_EASY.word);
    setDescriptionNormal(newSolution_NORMAL.description);
    setDescriptionHard(newSolution_HARD.description);
    setDescriptionEasy(newSolution_EASY.description);
  }, [SOLUTIONS]);

  return {
    solutionNormal,
    solutionHard,
    solutionEasy,
    descriptionNormal,
    descriptionEasy,
    descriptionHard,
  };
}
