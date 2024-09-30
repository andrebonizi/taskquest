import type { Attributes } from './user';

export interface Item {
  icon?: string;
  name?: string;
  type?: string;
  description?: string;
  attrib?: Attributes;
  index?: number;
}

export type Equips = {
  weapon: Item;
  armor: Item;
  misc: Item;
};

export type Icon = string; //change for existing icons
export type Kind = 'consumable' | 'weapon' | 'armor' | 'misc';
