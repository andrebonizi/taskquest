import type { Equips, Item } from './inventory';
import { TaskData } from './task';

export interface Attributes {
  power?: number;
  guard?: number;
  speed?: number;
  life: number;
  level: number;
  xp: number;
  gold: number;
}

export interface Player extends Attributes {
  items: Array<Item>;
  equip: Equips;
  tasks: TaskData[];
}
