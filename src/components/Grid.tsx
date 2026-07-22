import Row from './Row';

export default function Grid({
  currentGuess,
  guesses,
  turn,
  solution,
  invalidShake,
}: {
  currentGuess: string;
  guesses: ({ key: string; color: string }[] | null)[];
  turn: number;
  solution: string;
  invalidShake: boolean;
}) {
  return (
    <div className="w-full flex flex-col justify-center">
      {guesses.map((g, i) => (
        <Row
          key={i}
          guess={g}
          currentGuess={i === turn ? currentGuess : undefined}
          solution={solution}
          invalidShake={i === turn ? invalidShake : false}
        />
      ))}
    </div>
  );
}
