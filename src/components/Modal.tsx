import { CloseMenu } from '../icons';

export default function Modal({
  solution,
  stats,
  onClose,
  isCorrect,
  turn,
}: {
  solution: string;
  stats: {
    played: number;
    wins: number;
    currentStreak: number;
    bestStreak: number;
    distribution: number[];
  };
  onClose: () => void;
  isCorrect: boolean;
  turn: number;
}) {
  const accuracy =
    stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;

  const STAT_ITEMS = [
    { label: 'Total de jugadas', value: stats.played },
    { label: 'Aciertos', value: `${accuracy}%` },
    { label: 'Racha actual', value: stats.currentStreak },
    { label: 'Mejor racha', value: stats.bestStreak },
  ];

  return (
    <article className="w-full h-full font-Lato absolute top-0 left-0 z-20 backdrop-blur-[1px] flex flex-col justify-center items-center px-4">
      <div className="bg-[#1F1F1F] border border-[#7a7a7a] w-full max-w-md md:max-w-2xl lg:max-w-3xl max-h-[90svh] flex flex-col py-4 md:py-6 shadow-[0_4px_4px_rgb(0_0_0/_0.5)] justify-center items-center rounded-md overflow-y-auto">
        <section className="flex flex-col items-center relative w-full min-h-12">
          <CloseMenu
            className="z-10 absolute right-3 md:right-5 w-10 cursor-pointer text-stone-100 hover:scale-110 transition-transform hover:text-cyan-100"
            onClick={() => {
              onClose();
            }}
          />
          {isCorrect || turn >= 5 ? (
            <div className="flex flex-col items-center h-10 justify-center px-12">
              <span className="text-3xl md:text-4xl uppercase tracking-wide text-center">
                {solution}
              </span>
            </div>
          ) : null}
        </section>

        <section className="flex flex-col justify-center w-full items-center gap-3 md:gap-5 px-2 md:px-8 py-3 md:py-6">
          <span className="text-2xl md:text-3xl font-Lato text-stone-50">
            Estadisticas
          </span>
          <div className="grid grid-cols-4 w-full gap-2 md:gap-6">
            {STAT_ITEMS.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center w-full">
                <span className="text-2xl md:text-4xl mb-2 text-stone-100">
                  {value}
                </span>
                <span className="text-center font-Lato text-sm md:text-lg text-stone-100">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full flex flex-col justify-center items-center px-2 md:px-8 pb-2 md:pb-4">
          <span className="text-3xl md:text-4xl mb-4 md:mb-6 block text-center">
            Distribucion
          </span>
          <div className="flex flex-col gap-2 md:gap-3 w-11/12 md:w-10/12">
            {stats.distribution.map((count, i) => {
              const max = Math.max(...stats.distribution, 1);
              const width = (count / max) * 100;
              return (
                <div
                  key={i}
                  className="flex w-full gap-2 md:gap-3 items-center"
                >
                  <span className="w-4">{i + 1}</span>

                  <div className="flex-1 bg-[#1F1F1F] h-5 md:h-7 flex items-center rounded">
                    <div
                      className="h-full text-right px-4 bg-[#1FB2CC] font-Lato rounded flex items-center justify-end pr-2 text-md md:text-lg text-shadow-[0_0_4px_rgb(0_0_0/_0.8)]"
                      style={{ width: `${width}%` }}
                    >
                      {count >= 0 && count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
