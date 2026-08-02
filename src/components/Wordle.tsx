import { useEffect, useRef, useState } from 'react';
import useWordle from '../hooks/useWordle';
import { Grid, Keypad, Modal, Header, Menu, Welcome, LogInModal } from '.';
import { useStats } from '../hooks/useStats';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGameState } from '../hooks/useGameState';
import { useAuthSession } from '../hooks/useAuthSession';
import { CheckStats } from '../utils/checkStats';
import { fetchDailyGame, fetchStats, saveDailyGame } from '../services/api';
import { createEmptyStats, saveStats } from '../utils/storage';
import { clearGameState } from '../utils/gameStorage';

export default function Wordle({
  solution,
  gamemode,
  handleGameMode,
}: {
  solution: string;
  gamemode: 'normal' | 'hard' | 'easy';
  handleGameMode: (game: number) => void;
}) {
  const [isGameLocked, setIsGameLocked] = useState(false);
  const {
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    invalidShake,
    errorKey,
    resetGame,
  } = useWordle(solution, gamemode, isGameLocked);
  const { stats, registerLoss, registerWin, resetStats, syncFromServer } = useStats(gamemode);
  const { gameState, updateGameState, loadGameState, resetGameState } = useGameState(gamemode);
  const session = useAuthSession();
  const previousUserId = useRef<number | null | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const hasRegistered = useRef(false);
  const [showMenu, setShowMenu] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 768px)').matches
      : false,
  );
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (showLogIn) return;

    window.addEventListener('keyup', handleKeyup);
    if (isCorrect) {
      window.removeEventListener('keyup', handleKeyup);
    }
    if (turn > 5) {
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, turn, isCorrect, showLogIn]);

  const syncAllStats = async () => {
    await Promise.all(
      (['normal', 'easy', 'hard'] as const).map(async (mode) => {
        const remoteStats = await fetchStats(mode);
        saveStats(`stats-${mode}`, remoteStats ?? createEmptyStats());
      }),
    );
    await syncFromServer();
  };

  const resetAllStats = () => {
    (['normal', 'easy', 'hard'] as const).forEach((mode) => {
      saveStats(`stats-${mode}`, createEmptyStats());
    });
    resetStats();
  };

  useEffect(() => {
    const currentUserId = session?.user.id ?? null;

    if (previousUserId.current !== undefined && previousUserId.current !== currentUserId) {
      (['normal', 'easy', 'hard'] as const).forEach(clearGameState);
      hasRegistered.current = false;
      setShowModal(false);
      resetGame();
      resetGameState(solution);
    }

    previousUserId.current = currentUserId;
  }, [resetGame, resetGameState, session?.user.id, solution]);

  useEffect(() => {
    let cancelled = false;
    setIsGameLocked(false);

    if (!session) return;

    void fetchDailyGame(gamemode)
      .then((dailyGame) => {
        if (!dailyGame || cancelled) return;
        setIsGameLocked(true);
        setShowModal(true);
        toast(
          dailyGame.result === 'win'
            ? 'Ya ganaste la partida de hoy.'
            : 'Ya jugaste la partida de hoy.',
          { position: 'top-center', autoClose: 2500, theme: 'dark', hideProgressBar: true },
        );
      })
      .catch(() => {
        // Sin conexión, se conserva el comportamiento local.
      });

    return () => {
      cancelled = true;
    };
  }, [gamemode, session]);

  useEffect(() => {
    hasRegistered.current = false;
  }, [solution]);

  useEffect(() => {
    const storedState = loadGameState(gamemode);
    if (storedState.gameCompleted || hasRegistered.current) return;

    if (isCorrect) {
      hasRegistered.current = true;
      registerWin(turn);
      void saveDailyGame(gamemode, 'win', turn);
      updateGameState((previous) => ({ ...previous, gameCompleted: true }));

      const timeout = setTimeout(() => setShowModal(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (turn > 5) {
      hasRegistered.current = true;
      registerLoss();
      void saveDailyGame(gamemode, 'loss', null);
      updateGameState((previous) => ({ ...previous, gameCompleted: true }));
      const timeout = setTimeout(() => setShowModal(true), 2000);
      return () => clearTimeout(timeout);
    }
  }, [
    gamemode,
    gameState,
    isCorrect,
    loadGameState,
    registerLoss,
    registerWin,
    turn,
    updateGameState,
  ]);

  const played = CheckStats();
  useEffect(() => {
    if (!played) setShowWelcome(true);
  }, [played]);

  useEffect(() => {
    const accionesError: Record<number, () => void> = {
      1: () => {
        toast('La palabra no está en la lista', {
          position: 'top-center',
          autoClose: 1500,
          theme: 'dark',
          hideProgressBar: true,
          className: 'bg-[#4C4C4C] font-Lato text-lg text-stone-50',
        });
      },
      2: () => {
        toast('No se permiten mas de 6 intentos', {
          position: 'top-center',
          autoClose: 1500,
          theme: 'dark',
          hideProgressBar: true,
          className: 'bg-[#4C4C4C] font-Lato text-lg text-stone-50',
        });
      },
      3: () => {
        toast('No se permiten palabras duplicadas', {
          position: 'top-center',
          autoClose: 1500,
          theme: 'dark',
          hideProgressBar: true,
          className: 'bg-[#4C4C4C] font-Lato text-lg text-stone-50',
        });
      },
      4: () => {
        toast(`La palabra tiene que tener ${solution.length} letras `, {
          position: 'top-center',
          autoClose: 1500,
          theme: 'dark',
          hideProgressBar: true,
          className: 'bg-[#4C4C4C] font-Lato text-lg text-stone-50',
        });
      },
    };
    accionesError[errorKey]?.();
  }, [errorKey, solution]);

  return (
    <div className="text-stone-50 h-svh w-screen flex flex-col items-center justify-center pt-0 gap-0 overflow-hidden">
      {showWelcome && (
        <div className="absolute h-full w-full z-30">
          <Welcome onClose={() => setShowWelcome(false)} />
        </div>
      )}
      <div className="flex-1 w-11/12 max-w-xl max-h-15 lg:pt-0 xl:pt-0">
        <Header
          onModalOpen={() => setShowModal(true)}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          showLogIn={() => setShowLogIn(true)}
        />
      </div>
      <div className="h-[90%] w-11/12 flex flex-col items-center justify-center gap-10">
        <Grid
          currentGuess={currentGuess}
          guesses={guesses}
          turn={turn}
          solution={solution}
          invalidShake={invalidShake}
        />
        <Keypad
          usedKeys={usedKeys}
          onKeyPress={handleKeyup}
          turn={turn}
          isCorrect={isCorrect}
        />
      </div>
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          stats={stats}
          onClose={() => setShowModal(false)}
          showSolution={isGameLocked}
        />
      )}
      {showLogIn &&(
        <LogInModal
          onClose={() => setShowLogIn(false)}
          session={session}
          onSync={syncAllStats}
          onAccountCreated={resetAllStats}
        />
      )}
      <Menu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onWelcomeOpen={() => setShowWelcome(true)}
        handleGameMode={handleGameMode}
        gamemode={gamemode}
        user={session?.user ?? null}
        onAccountOpen={() => {
          setShowMenu(false);
          setShowLogIn(true);
        }}
      />
      <ToastContainer />
    </div>
  );
}
