import type { Equips, Item } from './inventory';

export interface User {
  id: string;
  name: string;
  photoSrc: string;
  player: string;
}

export interface Attributes {
  power?: number;
  guard?: number;
  speed?: number;
}

export interface Player extends Attributes {
  level: number;
  life: number;
  xp: number;
  gold: number;

  items: Array<Item>;
  equip: Equips;
}
