/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-22/data.txt",
  "utf8",
  () => null
);

enum CoordinateName {
  x = "x",
  y = "y",
  z = "z",
}

interface Coordinate {
  start: number;
  finish: number;
}

type Instruction = {
  [key in CoordinateName]: Coordinate;
};

enum Mode {
  on = "on",
  off = "off",
}

const input: (Mode | Instruction)[][] = dataset.split("\n").map((line) => {
  const [instr, rest] = line.split(" ");
  const coord: Instruction = rest.split(",").reduce(
    (a, l: string) => {
      const c = l.charAt(0);
      l = l.slice(2);
      const [start, finish] = l.split("..").map(Number);
      a[c] = { start: Math.max(start, -50), finish: Math.min(finish, 50) };
      return a;
    },
    { x: null, y: null, z: null }
  );
  return [Mode[instr], coord];
});

const reboot = (data: (string | Instruction)[][]): number => {
  const cubes = new Set();
  const f = (on: boolean, coord: Instruction) => {
    for (let x = coord.x.start; x <= coord.x.finish; x++) {
      for (let y = coord.y.start; y <= coord.y.finish; y++) {
        for (let z = coord.z.start; z <= coord.z.finish; z++) {
          on ? cubes.add(`${x},${y},${z}`) : cubes.delete(`${x},${y},${z}`);
        }
      }
    }
  };
  data.forEach(([i, c]: [Mode, Instruction]) => f(i === Mode.on, c));
  return cubes.size;
};
console.log(reboot(input));
