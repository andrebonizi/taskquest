import { Player } from '../interfaces/user';
import { LOCAL_PLAYER } from '../utils/constants';
import { equipFactory, initialItems } from './items';

export const ATTRIBS = ['life', 'power', 'guard', 'speed'];

const player: Player = {
  life: 10,
  power: 1,
  guard: 0,
  speed: 1,
  gold: 0,
  xp: 0,
  level: 1,
  items: initialItems,
  equip: {
    weapon: equipFactory(),
    armor: equipFactory(),
    misc: equipFactory(),
  },
  tasks: [],
};

export function setLocalPlayer(player: Player = null): void {
  if (!player) return;

  localStorage.setItem(LOCAL_PLAYER, JSON.stringify(player));
}

export function getLocalPlayer(): Player {
  const localPlayer = localStorage.getItem(LOCAL_PLAYER);

  if (localPlayer === null) {
    console.log('No player data saved...');
    return player;
  }

  return JSON.parse(localPlayer);
}
