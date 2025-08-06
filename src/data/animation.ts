const xAxis = 'translateX';
const yAxis = 'translateY';
const hue = 'hue-rotate';
const s = 'scale';

const red = '(330deg)';
const blue = '(110deg)';

const low = '(0%)';
const mid = '(-50%)';
const high = '(-100%)';

const hit = `${hue}${red}`;

export const damage = [
  {
    filter: hit,
    transform: `${xAxis}${mid} ${yAxis}${mid} ${s}(1)`,
  },
  {
    filter: hit,
    transform: `${xAxis}${mid} ${yAxis}${high} ${s}(.7)`,
  },
  {
    filter: hit,
    transform: `${xAxis}${mid} ${yAxis}${mid} ${s}(1)`,
  },
];

export const tackle = [
  {
    filter: `${hue}${blue}`,
    transform: `${xAxis}${mid} ${yAxis}${low} ${s}(1)`,
  },
  {
    filter: `${hue}${blue}`,
    transform: `${xAxis}${mid} ${yAxis}${mid} ${s}(1.5)`,
  },
  {
    filter: `${hue}${blue}`,
    transform: `${xAxis}${mid} ${yAxis}${mid} ${s}(1.5)`,
  },
  {
    filter: `${hue}${blue}`,
    transform: `${xAxis}${mid} ${yAxis}${mid} ${s}(1.5)`,
  },
  {
    filter: `${hue}${blue}`,
    transform: `${xAxis}${mid} ${yAxis}${low} ${s}(1)`,
  },
];

export const quickTiming = { duration: 100, iterations: 1 };
export const slowTiming = { duration: 150, iterations: 1 };

const battleChar = {
  golf: '🏌🏻',
  slick: '🚶🏻',
  base: '🚶🏻',
};
