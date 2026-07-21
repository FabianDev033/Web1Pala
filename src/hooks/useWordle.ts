import { useMemo, useState, useEffect, useRef } from 'react';
import { VALID_GUESSES } from '../data';
import { useGameState } from './useGameState';
import type { GameState } from '../interfaces/types';

const useWordle = (solution: string, gamemode: 'normal' | 'hard' | 'easy') => {
  const length = solution ? solution.length : 0;

  const WORD_SET = useMemo(() => new Set(VALID_GUESSES), []);
  const { gameState, updateGameState, resetGameState } = useGameState(gamemode);

  const turn = gameState.turn;
  const currentGuess = gameState.currentGuess;
  const guesses = gameState.guesses;
  const history = gameState.history;
  const usedKeys = gameState.usedKeys;
  const isCorrect = gameState.isCorrect;
  const gameCompleted = gameState.gameCompleted;
  const gameStateRef = useRef(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const commitGameState = (
    update: Partial<GameState> | ((prev: GameState) => Partial<GameState>),
  ) => {
    const prev = gameStateRef.current;
    const changes = typeof update === 'function' ? update(prev) : update;
    const next = { ...prev, ...changes };

    gameStateRef.current = next;
    updateGameState(next);
  };

  useEffect(() => {
    if (gameState.solutionStored !== solution) {
      resetGameState(solution);
    }
  }, [solution]);

  const [invalidShake, setInvalidShake] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  type KeyColor = 'green' | 'yellow' | 'grey';

  const triggerInvalidShake = () => {
    setInvalidShake(true);
    setTimeout(() => setInvalidShake(false), 300);
  };

  const triggerError = (n: number) => {
    setErrorKey(n);
    setTimeout(() => setErrorKey(0), 300);
  };

  const formatGuess = (guessToFormat: string) => {
    const solutionArray = [...solution!];
    const formattedGuess = [...guessToFormat].map((l) => ({
      key: l,
      color: 'grey' as KeyColor,
    }));

    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null!;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null!;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess: { key: string; color: KeyColor }[]) => {
    commitGameState((prev: GameState) => {
      const newGuesses = [...prev.guesses];
      newGuesses[prev.turn] = formattedGuess;

      const newHistory = [...prev.history, prev.currentGuess];
      const newUsedKeys = { ...prev.usedKeys };

      formattedGuess.forEach((l) => {
        const currentColor = newUsedKeys[l.key];
        if (l.color === 'green') newUsedKeys[l.key] = 'green';
        else if (l.color === 'yellow' && currentColor !== 'green')
          newUsedKeys[l.key] = 'yellow';
        else if (!currentColor) newUsedKeys[l.key] = 'grey';
      });

      return {
        ...prev,
        turn: prev.turn + 1,
        guesses: newGuesses,
        history: newHistory,
        usedKeys: newUsedKeys,
        isCorrect: prev.currentGuess === solution,
        currentGuess: '',
      };
    });
  };

  const handleKeyup = ({ key }: { key: string }) => {
    const state = gameStateRef.current;
    const guess = state.currentGuess;

    if (key === 'Enter') {
      if (state.turn > 5) {
        triggerInvalidShake();
        triggerError(2);
        return;
      }

      if (state.history.includes(guess)) {
        triggerInvalidShake();
        triggerError(3);
        return;
      }

      if (guess.length !== length) {
        triggerInvalidShake();
        triggerError(4);
        return;
      }

      if (
        guess.length === 5 &&
        !WORD_SET.has(guess.toLowerCase())
      ) {
        triggerInvalidShake();
        triggerError(1);
        return;
      }

      const formatted = formatGuess(guess);
      addNewGuess(formatted);
      return;
    }

    if (state.gameCompleted || state.isCorrect || state.turn > 5) {
      return;
    }

    if (key === 'Backspace') {
      commitGameState((prev) => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
      return;
    }

    if (/^\p{L}$/u.test(key)) {
      if (guess.length < length) {
        commitGameState((prev) => ({
          ...prev,
          currentGuess: prev.currentGuess + key.toLowerCase(),
        }));
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    gameCompleted,
    usedKeys,
    history,
    invalidShake,
    errorKey,
    handleKeyup,
  };
};

export default useWordle;
