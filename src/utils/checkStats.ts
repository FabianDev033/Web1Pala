import { useStats } from '../hooks/useStats';

export function CheckStats() {
  const normal: number = Normal();
  const hard: number = Hard();
  const easy: number = Easy();

  const result = normal !== 0 || hard !== 0 || easy !== 0;
  return result;
}

function Normal() {
  const { stats } = useStats('normal');
  if (stats.played !== 0) return stats.played;
  return 0;
}

function Hard() {
  const { stats } = useStats('hard');
  if (stats.played !== 0) return stats.played;
  return 0;
}

function Easy() {
  const { stats } = useStats('easy');
  if (stats.played !== 0) return stats.played;
  return 0;
}
