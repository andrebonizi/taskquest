import { weapons, food, armor, misc } from './icons';

export const initialItems = [
  {
    icon: food.natural.apple,
    name: 'Apple',
    type: 'consumable',
    description: 'Recupera a vida.',
    attrib: { life: 5 },
  },
  {
    icon: food.natural.banana,
    name: 'Banana',
    type: 'consumable',
    description: 'Recupera a vida.',
    attrib: { life: 5 },
  },
  {
    icon: weapons.wrench,
    name: 'Wrench',
    type: 'weapon',
    description: 'Equipamento.',
    attrib: { power: 1 },
  },
  {
    icon: weapons.hammer,
    name: 'Hammer',
    type: 'weapon',
    description: 'Equipamento.',
    attrib: { power: 2 },
  },
  {
    icon: weapons.bow,
    name: 'Bow',
    type: 'weapon',
    description: 'Equipamento.',
    attrib: { power: 2 },
  },
  {
    icon: weapons.knife,
    name: 'Knife',
    type: 'weapon',
    description: 'Equipamento.',
    attrib: { power: 3 },
  },
  {
    icon: weapons.sword,
    name: 'Sword',
    type: 'weapon',
    description: 'Equipamento.',
    attrib: { power: 4 },
  },
  {
    icon: weapons.revolver,
    name: 'Revolver',
    type: 'weapon',
    description: 'Equipamento.',
    attrib: { power: 5 },
  },
  {
    icon: armor.tshirt,
    name: 'Shirt',
    type: 'armor',
    description: 'Equipamento.',
    attrib: { guard: 1 },
  },
  {
    icon: armor.pants,
    name: 'Jeans',
    type: 'armor',
    description: 'Equipamento.',
    attrib: { guard: 1 },
  },
  {
    icon: armor.shirt,
    name: 'Formal Shirt',
    type: 'armor',
    description: 'Equipamento.',
    attrib: { guard: 1 },
  },
  {
    icon: armor.kimono,
    name: 'Kimono',
    type: 'armor',
    description: 'Equipamento.',
    attrib: { guard: 1 },
  },
  {
    icon: armor.backpack,
    name: 'Backpack',
    type: 'armor',
    description: 'Equipamento.',
    attrib: { guard: 1 },
  },
  {
    icon: misc.tools.mallet,
    name: 'Mallet',
    type: 'misc',
    description: 'Equipamento.',
    attrib: { guard: 1 },
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

type Icon = string; //change for existing icons
type Kind = 'consumable' | 'weapon' | 'armor' | 'misc';

interface Item {
  icon: Icon;
  type: Kind;
  name: string;
  description: string;
}

interface Equip extends Item {
  attrib: Attributes;
}

interface Attributes {
  life: number;
  power: number;
  guard: number;
}

function consumableFactory({ name, description, icon, data }) {
  return {
    ...itemFactory({ name, description, icon, type: 'consumable' }),
    attrib: data,
  };
}

function weaponFactory({ name, description, icon, data }): Equip {
  return {
    ...itemFactory({ name, description, icon, type: 'weapon' }),
    attrib: data,
  };
}

function itemFactory({ name, description, icon, type }): Item {
  return {
    icon,
    type,
    name,
    description,
  };
}
