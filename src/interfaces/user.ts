export interface User {
  id: string;
  name: string;
  photoSrc: string;
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

  inventory: Array<string>;
  equip: Equip;
}

export interface Equip {
  weapon: number;
  armor: number;
  misc: number;
}
