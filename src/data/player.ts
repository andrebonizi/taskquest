import { Player } from '../interfaces/user';
import { equipFactory, initialItems } from './items';

export const player: Player = {
  life: 10,
  power: 1,
  guard: 0,
  speed: 1,
  gold: 0,
  xp: 0,
  level: 1,
  items: initialItems,
  equip: {
    weapon: equipFactory({}),
    armor: equipFactory({}),
    misc: equipFactory({}),
  },
};
