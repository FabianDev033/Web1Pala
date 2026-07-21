function Letter({
  children,
  color,
}: {
  children: string;
  color: 'gray' | 'green' | 'yellow';
}) {
  const base =
    'text-stone-50 font-Lato uppercase font-semibold flex justify-center items-center rounded-md text-shadow-[0_4px_4px_rgb(0_0_0/_0.25)] min-w-9 h-11 text-2xl md:w-11 md:h-14 md:text-3xl lg:w-13 lg:h-15 lg:text-4xl';

  const colors = {
    gray: 'bg-[#3A3A3B] border border-[#7A7A7A]',
    green: 'bg-[#2fb80d]',
    yellow: 'bg-[#e4a81d]',
  };

  return <span className={`${base} ${colors[color]}`}>{children}</span>;
}

function LetterRow({
  letters,
  color,
}: {
  letters: string[];
  color: 'gray' | 'green' | 'yellow';
}) {
  return (
    <div className="flex gap-2 mb-2">
      {letters.map((l, k) => (
        <Letter key={k} color={color}>
          {l}
        </Letter>
      ))}
    </div>
  );
}

export default function Welcome({ onClose }: { onClose: () => void }) {
  return (
    <div
      id="welcome"
      className="h-full w-full flex flex-col  items-center cursor-default z-30 pt-2"
    >
      <div className="flex-1 flex flex-col items-center max-w-[900px]">
        <LetterRow letters={['L', 'A']} color="gray" />
        <LetterRow
          letters={['B', 'O', 'L', 'U', 'D', 'E', 'Z']}
          color="green"
        />
        <LetterRow letters={['D', 'E', 'L']} color="gray" />
        <LetterRow letters={['D', 'I', 'A']} color="yellow" />

        <div className="font-Lato text-base md:text-lg lg:text-xl w-[90%] md:w-9/12 flex flex-col gap-2 text-stone-50 mt-0 md:mt-4">
          <p>
            Las reglas son simples: adivina la palabra argentina oculta en 6
            intentos.
          </p>
          <p>Cada intento debe ser una palabra válida.</p>
          <p>Si la palabra no existe el juego te avisará.</p>
          <span>
            Después de cada intento el color de las casillas cambia para mostrar
            qué tan cerca estás de acertar la palabra.
          </span>
        </div>

        <div className="w-[90%] md:w-[80%] mt-4 flex flex-col gap-2 font-Lato text-stone-50 text-base md:text-lg">
          <div className="flex items-center gap-4">
            <Letter color="gray">V</Letter>
            <span>GRIS La letra NO está presente en la palabra</span>
          </div>

          <div className="flex items-center gap-4">
            <Letter color="green">A</Letter>
            <span>
              VERDE La letra está en la palabra y en la posición CORRECTA
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Letter color="yellow">R</Letter>
            <span>
              AMARILLO La letra está presente en la palabra pero en la posición
              INCORRECTA
            </span>
          </div>
        </div>
        <section className="absolute w-full bottom-5 md:w-7/12 md-bottom-5 lg:w-5/12 lg:flex">
          <div className="w-full flex justify-between items-center mt-2 px-4 md:px-0">
            <span className="font-Lato text-lg md:text-xl text-stone-50">
              ¡Una palabra nueva cada día!
            </span>

            <button
              onClick={onClose}
              className="bg-[#2fb80d] text-stone-50 cursor-pointer px-4 py-2 font-Lato text-lg md:text-xl font-medium rounded-md text-shadow-[0_4px_4px_rgb(0_0_0/_0.25)]"
            >
              Jugar!
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
