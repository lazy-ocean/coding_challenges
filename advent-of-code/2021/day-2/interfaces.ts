export enum Directions {
  forward = "forward",
  down = "down",
  up = "up",
}

export interface MovingInstruction {
  direction: Directions;
  steps: number;
}

export interface BoatPosition {
  depth: number;
  horizontal: number;
  aim?: number;
}
