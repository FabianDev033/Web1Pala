import { Backspace, Enter } from '../icons';

export default function Keypad({
  usedKeys,
  onKeyPress,
  turn,
  isCorrect,
}: {
  usedKeys?: { [key: string]: string };
  onKeyPress: (e: KeyboardEvent) => void;
  turn: number;
  isCorrect: boolean;
}) {
  const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'];
  const row3 = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];

  const green = 'bg-[#202B20] border border-[#43A047] text-stone-100';

  const yellow = 'bg-[#2A2820] border border-[#e4a81d] text-stone-100';

  const grey = 'bg-[#232323] border border-[#7A7A7A] text-stone-100';

  const normal = 'bg-[#3A3A3B] border border-[#7A7A7A] text-stone-100';

  function renderKey(key: string) {
    const color = usedKeys ? usedKeys[key] : '';

    const handleClick = () => {
      onKeyPress(
        !isCorrect && turn < 6
          ? new KeyboardEvent('keyup', { key })
          : new KeyboardEvent('keyup', { key: '' }),
      );
    };

    let label: React.ReactNode = key;

    if (key === 'Backspace') {
      label = (
        <Backspace className="w-6 md:w-8 drop-shadow-[0px_4px_4px_rgba(0,0,0,.5)]" />
      );
    }

    if (key === 'Enter') {
      label = (
        <Enter className="w-6 md:w-8 drop-shadow-[0px_4px_4px_rgba(0,0,0,.5)]" />
      );
    }

    const colorClass =
      color === 'green'
        ? green
        : color === 'yellow'
          ? yellow
          : color === 'grey'
            ? grey
            : normal;

    const spanClass =
      key === 'Enter' || key === 'Backspace' ? 'col-span-3' : 'col-span-2';

    return (
      <button
        key={key}
        onClick={handleClick}
        className={`
          ${colorClass}
          ${spanClass}
          h-12 md:h-14
          font-Manrope
          uppercase
          text-lg md:text-[1.5rem]
          font-regular
          text-shadow-[0_4px_4px_rgb(0_0_0/_0.5)]
          flex
          justify-center
          items-center
          rounded-md
          hover:brightness-110
          cursor-pointer
          transition-all
          text-stone-50
          ${color ? 'animate-popIn' : ''}
        `}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-1 lg:gap-2">
      <div className="grid grid-cols-20 gap-1 lg:gap-2">
        {row1.map(renderKey)}
      </div>

      <div className="grid grid-cols-20 gap-1 lg:gap-2">
        {row2.map(renderKey)}
      </div>

      <div className="grid grid-cols-20 gap-1 lg:gap-2">
        {row3.map(renderKey)}
      </div>
    </div>
  );
}
