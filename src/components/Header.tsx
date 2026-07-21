import { Menu, StatsIcon, LeftArrow } from '../icons/';

export default function Header({
  onModalOpen,
  setShowMenu,
  showMenu,
}: {
  onModalOpen: () => void;
  setShowMenu: (value: boolean) => void;
  showMenu: boolean;
}) {
  function MenuSwitch() {
    setShowMenu(!showMenu);
  }

  return (
    <header className="w-full h-12 md:h-16 mx-auto flex items-center justify-between gap-4 px-1 md:px-4">
      <div onClick={MenuSwitch}>
        {showMenu ? (
          <LeftArrow className="animate-menuIcon-open cursor-pointer w-7 md:w-9 text-[rgb(162_161_160_/0.6)]" />
        ) : (
          <Menu className="animate-menuIcon-open cursor-pointer w-7 md:w-9 text-[#A2A1A0]" />
        )}
      </div>

      <span className="font-Lato font-normal text-2xl sm:text-2xl md:text-3xl lg:text-[1.8rem] text-center">
        LA BOLUDEZ DEL DIA
      </span>

      <div onClick={onModalOpen}>
        <StatsIcon className="cursor-pointer w-8 md:w-9 text-[#A2A1A0]" />
      </div>
    </header>
  );
}
