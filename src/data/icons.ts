export const weapons = {
  wrench: '🔧',
  chain: '⛓',
  hammer: '🔨',
  dualtool: '🛠',
  dualhammer: '⚒',
  pickaxe: '⛏',
  knife: '🔪',
  sword: '🗡',
  dualsword: '⚔️',
  bow: '🏹',
  revolver: '🔫',
};

export const armor = {
  tshirt: '👕',
  pants: '👖',
  shirt: '👔',
  dress: '👗',
  silkshirt: '👚',
  bikini: '👙',
  kimono: '👘',
};

export const tools = {
  backpack: '🎒',
  handbag: '👜',
  mallet: '💼',
  purse: '👛',
  shield: '🛡',
  pencil: '✏️',
  scissor: '✂️',
  umbrella: '☂️',
  flashlight: '🔦',
  bomb: '💣',
  juzu: '📿',
  bell: '🔔',
  termometer: '🌡',
  ring: '💍',
  watch: '⌚️',
};

export const eyes = {
  glasses: '👓',
  sunglasses: '🕶',
};

export const hats = {
  crown: '👑',
  ribbonHat: '👒',
  topHat: '🎩',
  graduateHat: '🎓',
  helmet: '⛑',
};

export const shoes = {
  leatherShoes: '👞',
  sneakers: '👟',
  highHeels: '👠',
  sandals: '👡',
  boots: '👢',
};

export const misc = {
  tools,
  eyes,
  hats,
  shoes,
};

export const food = {
  natural: {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grape: '🍇',
    lemon: '🍋',
    peach: '🍑',
    tomato: '🍅',
    corn: '🌽',
    eggplant: '🍆',
    pepper: '🌶',
    mushroom: '🍄',
    nut: '🌰',
  },
  artificial: {
    honey: '🍯',
    bread: '🍞',
    meat: '🍗',
    steak: '🍖',
    cheese: '🧀',
    pizza: '🍕',
  },
};

export const drugs = {
  soup: '🍵',
  cigar: '🚬',
  remedy: '💊',
  injection: '💉',
  coffee: '☕️',
  beer: '🍺',
  wine: '🍷',
  mojito: '🍸',
  caipirinha: '🍹',
  champagne: '🍾',
};

export const books = {
  diary: '📓',
  notebook: '📒',
  manual: '📔',
  science1: '📕',
  science2: '📗',
  science3: '📘',
  science4: '📙',
  bookCollection: '📚',
};

export const stuff = {
  key: '🔑',
  antiqueKey: '🗝',
  package: '📦',
  lockpick: '📎',
  doubleLockpick: '🖇',
  battery: '🔋',
  locker: '🔒',
  coin: '🪙',
  money: '💵',
};

export const use = {
  drugs,
  food,
  books,
  stuff,
};

export const items = {
  weapons,
  armor,
  misc,
  use,
};

export const magic = {
  hit: '💥',
  fire: '🔥',
  ice: '❄️',
  thunder: '⚡',
  meteor: '☄️',
  water: '💧',
  wave: '🌊',
  wind: '🌪️',
  storm: '🌩️',
  heal: '⚕️',
};

export const map = {
  snowmountain: '🏔️',
  pine: '🌲',
  tree: '🌳',
  grass: '🌾',
  rock: '🪨',
  cloud: '☁️',
  woods: '🪵',
  mountain: '⛰️',
};

export const fencer = '🤺';

export const enemies = {
  spider: '🕷️',
  rat: '🐀',
  bat: '🦇',
  racoon: '🦝',
  monkey: '🐒',
  scorpion: '🦂',
  snake: '🐍',
  shark: '🦈',
  eagle: '🦅',
  leopard: '🐆',
  gorilla: '🦍',
  tiger: '🐅',
  crocodile: '🐊',
  rhinoceros: '🦏',
  troll: '🧌',
  dragon: '🐉',
};

export const status = {
  info: {
    power: '🔵',
    guard: '🟩',
    speed: '🔺',
  },
};

export const clock = {
  1: '🕛',
  2: '🕚',
  3: '🕙',
  4: '🕘',
  5: '🕗',
  6: '🕖',
  7: '🕕',
  8: '🕔',
  9: '🕓',
  10: '🕒',
  11: '🕑',
  12: '🕐',
};

export function getFaceIcon(life: number): string | null {
  if (life < 0 || life > 10) return null;
  if (life < 3) return '😭';
  if (life < 5) return '😰';
  if (life < 7) return '😬';
  if (life < 8) return '😅';
  if (life < 10) return '🙂';
  if (life < 11) return '😃';
}
