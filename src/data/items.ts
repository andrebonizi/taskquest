import { Item } from '../interfaces/inventory';

export const EQUIP_TYPES = ['weapon', 'armor', 'misc'];

export const initialItems = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export function consumableFactory(data): Item {
  return itemFactory({ ...data, type: 'consumable' });
}

export function equipFactory(data = {}): Item {
  return itemFactory({ ...data, type: 'weapon' });
}

export function itemFactory({
  name = '...',
  description = '',
  icon = '',
  attrib = {},
  type,
}): Item {
  return {
    icon,
    type,
    name,
    description,
    attrib,
  };
}
