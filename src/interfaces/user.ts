import type { Item } from './inventory';

export interface User {
  id: string;
  name: string;
  photoSrc: URL;
  player: Player;
}

export interface Player {
  level: number;
  hp: number;
  xp: number;
  gold: number;

  atk: number;
  def: number;
  dex: number;

  inventory: Array<Item>;
  equip: Equip;
}

export interface Equip {
  weapon: Item;
  armor: Item;
  misc: Item;
}
