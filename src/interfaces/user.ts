export interface User {
    id: string;
    name: string;
    photoSrc: string;
    player: Player;
}

export interface Player {
    level: number;
    life: number;
    xp: number;
    gold: number;

    power: number;
    guard: number;
    speed: number;

    inventory: Array<number>;
    equip: Equip;
}

export interface Equip {
    weapon: number;
    armor: number;
    misc: number;
}