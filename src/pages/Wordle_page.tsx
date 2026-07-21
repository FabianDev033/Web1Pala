import { useEffect, useState } from 'react';
import Wordle from '../components/Wordle.tsx';
import { useDailySolution } from '../hooks/useDailySolution.ts';
export function DefaultWordle_page() {
  const {
    solutionNormal,
    solutionHard,
    solutionEasy,
  } = useDailySolution();
  const [solution, setSolution] = useState<string | null>(null);
  const [gamemode, setGamemode] = useState<'normal' | 'hard' | 'easy'>(
    'normal'
  );
  useEffect(() => {
    if (gamemode === 'easy') {
      setSolution(solutionEasy);
    }
    if (gamemode === 'normal') {
      setSolution(solutionNormal);
    }
    if (gamemode === 'hard') {
      setSolution(solutionHard);
    }
  }, [gamemode, solutionEasy, solutionHard, solutionNormal]);

  const handleGameMode = (game: number) => {
    const setGame: Record<number, () => void> = {
      1: () => {
        setGamemode('normal');
        setSolution(solution);
      },
      2: () => {
        setGamemode('hard');
        setSolution(solutionHard);
      },
      3: () => {
        setGamemode('easy');
        setSolution(solutionEasy);
      },
    };
    setGame[game]?.();
  };
  return (
    <>
      <div className="text-stone-50 w-full h-[svh] flex flex-col items-center justify-center">
        {solution && (
          <Wordle
            key={gamemode + '-' + solution}
            solution={solution}
            gamemode={gamemode}
            handleGameMode={handleGameMode}
          ></Wordle>
        )}
      </div>
    </>
  );
}
