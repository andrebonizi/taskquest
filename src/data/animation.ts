const hue = 'hue-rotate';
const x = 'translateX';
const y = 'translateY';
const s = 'scale';

export const damage = [
  { filter: `${hue}(330deg)`, transform: `${x}(-20%) ${y}(-50%) ${s}(1)` },
  { filter: `${hue}(330deg)`, transform: `${x}(-80%) ${y}(-50%) ${s}(1)` },
];

export const shake = [
  { filter: `${hue}(110deg)`, transform: `${x}(-50%) ${y}(-40%) ${s}(1.2)` },
  { filter: `${hue}(110deg)`, transform: `${x}(-50%) ${y}(-80%) ${s}(1)` },
];

export const quickTiming = { duration: 100, iterations: 2 };
export const slowTiming = { duration: 200, iterations: 1 };
