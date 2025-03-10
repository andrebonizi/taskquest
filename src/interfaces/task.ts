export interface TaskData {
  code: number;
  text: string;
  done: boolean;
  level: number;
}

export interface Enemy {
  level: number;
  icon: string;
  name: string;
  taskColor: string;
}
