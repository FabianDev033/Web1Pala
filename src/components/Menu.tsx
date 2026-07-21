import {
  Estrella_1,
  Estrella_2,
  Estrella_3,
  Bandera,
  Capibara,
  Falcon,
  Mafia,
  Maradona,
  Messi,
  Mate,
} from '../assets/images';

import { CloseMenu } from '../icons';

export default function Menu({
  onClose,
  onWelcomeOpen,
  isOpen,
  handleGameMode,
  gamemode,
}: {
  onClose: () => void;
  onWelcomeOpen: () => void;
  isOpen: boolean;
  handleGameMode: (game: number) => void;
  gamemode: 'normal' | 'hard' | 'easy';
}) {
  return (
    <nav
      className={`w-80 h-full absolute left-0 top-0 p-4 bg-[#1A1A1A] flex flex-col items-start ${
        isOpen ? 'animate-openMenu' : 'animate-closeMenu'
      }`}
    >
      <div className="absolute bottom-0 right-0 z-0">
        {gamemode === 'normal' ? (
          <div className=" ">
            <img src={Maradona} alt="" className="absolute bottom-0 z-0" />
            <img src={Messi} alt="" className="relative bottom-0 z-0" />
          </div>
        ) : gamemode === 'easy' ? (
          <div className=" ">
            <img src={Bandera} alt="" className="relative bottom-0 z-0" />
            <img
              src={Capibara}
              alt=""
              className="absolute w-40 bottom-0 z-10"
            />
            <img
              src={Mate}
              alt=""
              className=" w-40 absolute bottom-0 right-0 z-10"
            />
          </div>
        ) : (
          <div className=" ">
            <img
              src={Mafia}
              alt=""
              className="absolute w-80 bottom-0 left-0 z-0"
            />
            <img src={Falcon} alt="" className="relative w-80 bottom-0 z-10" />
          </div>
        )}
      </div>
      <div
        className="absolute right-4 top-5 z-10 cursor-pointer"
        onClick={onClose}
      >
        <CloseMenu></CloseMenu>
      </div>
      <div className="w-full flex justify-center ">
        <span className="font-Lato text-2xl text-stone-50">
          La boludez del dia
        </span>
      </div>
      <div className="mt-24 z-10 ">
        <span className="font-Lato text-lg text-stone-300 cursor-default">
          Modos de juego
        </span>
        <ul className="font-Lato text-xl mt-6 ml-6  text-stone-50">
          <li
            className="mb-4 cursor-pointer flex items-center  gap-4 justify-between w-40"
            onClick={() => handleGameMode(3)}
          >
            {gamemode === 'easy' ? (
              <img src={Estrella_1} alt="" className="w-8  absolute left-2" />
            ) : null}
            <span>Facil</span>
            <span className="text-sm text-[#8C8B8A] relative -top-4 -rotate-12">
              {gamemode === 'easy' ? 'modo botsito' : null}
            </span>
          </li>
          <li
            className="mb-4 cursor-pointer flex items-center justify-between w-45"
            onClick={() => handleGameMode(1)}
          >
            {gamemode === 'normal' ? (
              <img src={Estrella_2} alt="" className="w-8 absolute left-0" />
            ) : null}
            <span>Normal</span>
            <span className="text-sm text-[#8C8B8A] relative -top-4 -rotate-12">
              {gamemode === 'normal' ? 'modo messi' : null}
            </span>
          </li>
          <li
            className="mb-4 cursor-pointer flex items-center justify-between w-50"
            onClick={() => handleGameMode(2)}
          >
            {gamemode === 'hard' ? (
              <img src={Estrella_3} alt="" className="w-8 absolute left-0" />
            ) : null}
            <span>Dificil</span>
            <span className="text-sm text-[#8C8B8A] relative -top-4 -rotate-12">
              {gamemode === 'hard' ? 'modo chiqui mafia' : null}
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-12 z-10">
        <span className="font-Lato text-lg text-stone-300  cursor-default">
          Informacion
        </span>
        <ul className="font-Lato text-xl mt-6 ml-6 text-stone-50">
          <li onClick={onWelcomeOpen} className="mb-4 cursor-pointer">
            Como jugar
          </li>
        </ul>
      </div>
    </nav>
  );
}
