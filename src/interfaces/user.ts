import type { Equips, Item } from './inventory';
import { TaskData } from './task';

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
  tasks: TaskData[];
}
