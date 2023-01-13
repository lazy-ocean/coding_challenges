export enum Directions {
  N = "N",
  S = "S",
  W = "W",
  E = "E",
}

export const directionsMapping = {
  [Directions.N]: [Directions.N, Directions.S, Directions.W, Directions.E],
  [Directions.S]: [Directions.S, Directions.W, Directions.E, Directions.N],
  [Directions.W]: [Directions.W, Directions.E, Directions.N, Directions.S],
  [Directions.E]: [Directions.E, Directions.N, Directions.S, Directions.W],
};
