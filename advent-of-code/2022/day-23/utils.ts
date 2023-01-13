import { Directions } from "./interface";

export const findElves = (map: string[][]): string[] => {
  const elvesMap = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === "#") elvesMap.push(`${i};${j}`);
    }
  }
  return elvesMap;
};

export const checkDirVert = (
  map: string[],
  i: number,
  j: number,
  dir: Directions
): boolean => {
  const ind = dir === Directions.N ? -1 : 1;
  return (
    !map.includes(`${i + ind};${j - 1}`) &&
    !map.includes(`${i + ind};${j}`) &&
    !map.includes(`${i + ind};${j + 1}`)
  );
};

export const checkDirHor = (
  map: string[],
  i: number,
  j: number,
  dir: Directions
): boolean => {
  const ind = dir === Directions.E ? 1 : -1;
  return (
    !map.includes(`${i - 1};${j + ind}`) &&
    !map.includes(`${i};${j + ind}`) &&
    !map.includes(`${i + 1};${j + ind}`)
  );
};

export const checkIfElvesAround = (
  i: number,
  j: number,
  map: string[]
): boolean =>
  map.includes(`${i - 1};${j - 1}`) ||
  map.includes(`${i - 1};${j}`) ||
  map.includes(`${i - 1};${j + 1}`) ||
  map.includes(`${i};${j - 1}`) ||
  map.includes(`${i};${j + 1}`) ||
  map.includes(`${i + 1};${j - 1}`) ||
  map.includes(`${i + 1};${j}`) ||
  map.includes(`${i + 1};${j + 1}`);
