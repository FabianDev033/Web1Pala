type KeyColor = 'green' | 'yellow' | 'grey';
export interface GameState {
  turn: number;
  currentGuess: string;
  guesses: { key: string; color: KeyColor }[][];
  history: string[];
  isCorrect: boolean;
  gameCompleted: boolean;
  usedKeys: Record<string, string>;
  solutionStored: string | null;
}
