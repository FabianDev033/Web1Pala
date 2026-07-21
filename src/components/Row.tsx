export default function Row({
  solution,
  guess,
  currentGuess,
  invalidShake,
}: {
  solution: string;
  guess?: { key: string; color: string }[] | null;
  currentGuess?: string | '';
  invalidShake: boolean;
}) {
  const getTileClasses = (length: number) => {
    if (length <= 5) {
      return {
        size: 'w-15 min-w-7 max-w-15 md:w-16 md:max-w-16 lg:w-17 lg:max-w-17',
        text: 'text-4xl md:text-[2.5rem]',
      };
    }

    if (length <= 7) {
      return {
        size: 'w-13 min-w-7 max-w-13 md:w-15 md:max-w-15 lg:w-16 lg:max-w-16',
        text: 'text-3xl md:text-4xl',
      };
    }

    if (length <= 9) {
      return {
        size: 'w-11 min-w-7 max-w-11 md:w-13 md:max-w-13 lg:w-15 lg:max-w-15',
        text: 'text-2xl md:text-3xl lg:text-4xl',
      };
    }

    if (length <= 11) {
      return {
        size: 'w-10 min-w-7 max-w-10 md:w-12 md:max-w-12 lg:w-13 lg:max-w-13',
        text: 'text-xl md:text-3xl',
      };
    }

    return {
      size: 'w-8 min-w-7 max-w-8 md:w-10 md:max-w-10 lg:w-11 lg:max-w-11',
      text: 'text-lg md:text-2xl lg:text-3xl',
    };
  };
  const gapClass = solution.length > 10 ? 'gap-[2px] md:gap-1' : 'gap-1 md:gap-2';
  const { size, text } = getTileClasses(solution.length);
  const green = 'animate-flip-green';
  const yellow = 'animate-flip-yellow';
  const gray = 'animate-flip-gray';
  const base = `
  bg-[#101010]
  border border-[#7A7A7A]
  text-stone-50
  ${size}
  aspect-square
  min-h-7
  ${text}
  font-Lato
  uppercase
  font-semibold
  text-shadow-[0_4px_4px_rgb(0_0_0/_0.25)]
  flex
  justify-center
  items-center
  rounded-sm
`;

  const baseNoBorder = `
  bg-[#101010]
  text-stone-50
  ${size}
  aspect-square
  min-h-7
  ${text}
  font-Lato
  uppercase
  font-semibold
  text-shadow-[0_4px_4px_rgb(0_0_0/_0.25)]
  flex
  justify-center
  items-center
  rounded-sm
`;
  if (guess) {
    return (
      <div className={`mb-2 flex justify-center ${gapClass}  `}>
        {guess.map((l, i) => (
          <div
            key={i}
            className={
              base +
              ' ' +
              (l.color === 'green'
                ? green
                : l.color === 'yellow'
                  ? yellow
                  : gray)
            }
            style={{ animationDelay: `${i * 0.13}s` }}
          >
            {l.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess === '' || currentGuess) {
    return (
      <div
        className={`mb-2 flex justify-center ${gapClass} ${
          invalidShake ? 'animate-shake' : ''
        }`}
      >
        {currentGuess.split('').map((l, i) => (
          <div key={i} className={base + ' animate-popIn'}>
            {l}
          </div>
        ))}
        {Array.from({ length: solution.length - currentGuess.length }).map(
          (_, i) => (
            <div
              key={i}
              className={
                baseNoBorder +
                ' ' +
                `${i === 0 ? 'border border-[#1FD7F8]' : 'border border-[#7A7A7A]'}`
              }
            />
          ),
        )}
      </div>
    );
  }

  return (
    <div className={`mb-2 flex justify-center ${gapClass} `}>
      {solution.split('').map((_, i) => (
        <div key={i} className={base}></div>
      ))}
    </div>
  );
}
