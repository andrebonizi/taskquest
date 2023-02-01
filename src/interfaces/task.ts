export interface Task {
    text: string;
    status: boolean;
    enemy: Enemy;
}

export interface Enemy {
    level: number;
    icon: string;
    name: string;
    taskColor: string;
}