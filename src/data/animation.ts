import { isMobile } from '../utils/device';

const x = 'translateX';
const y = 'translateY';
const hue = 'hue-rotate';
const s = 'scale';

const red = '(330deg)';
const blue = '(110deg)';

const lowY = '(0%)';
const midY = '(-50%)';
const highY = '(-100%)';

const hit = `${hue}${red}`;

const getX = () => (isMobile() ? '(-50%)' : '(-50%)');

export const damage = [
  {
    filter: hit,
    transform: `${x}${getX()} ${y}${midY} ${s}(1)`,
  },
  {
    filter: hit,
    transform: `${x}${getX()} ${y}${highY} ${s}(.7)`,
  },
  {
    filter: hit,
    transform: `${x}${getX()} ${y}${midY} ${s}(1)`,
  },
];

export const tackle = [
  {
    filter: `${hue}${blue}`,
    transform: `${x}${getX()} ${y}${lowY} ${s}(1)`,
  },
  {
    filter: `${hue}${blue}`,
    transform: `${x}${getX()} ${y}${midY} ${s}(1.2)`,
  },
  {
    filter: `${hue}${blue}`,
    transform: `${x}${getX()} ${y}${lowY} ${s}(1)`,
  },
];

export const quickTiming = { duration: 100, iterations: 1 };
export const slowTiming = { duration: 150, iterations: 1 };
