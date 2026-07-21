const DEFAULT_STATE = {
  turn: 0,
  currentGuess: '',
  guesses: Array(6).fill(null),
  history: [],
  isCorrect: false,
  gameCompleted: false,
  usedKeys: {},
  solutionStored: null,
};

export function loadGameState(gamemode: 'normal' | 'hard' | 'easy') {
  const json = localStorage.getItem(`game-${gamemode}`);
  if (!json) return DEFAULT_STATE;
  return JSON.parse(json);
}

export function saveGameState(gamemode: string, state: any) {
  localStorage.setItem(`game-${gamemode}`, JSON.stringify(state));
}

export function clearGameState(gamemode: string) {
  localStorage.removeItem(`game-${gamemode}`);
}
