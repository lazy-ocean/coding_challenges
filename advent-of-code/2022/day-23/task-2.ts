/* eslint-disable no-unused-expressions */
/* eslint-disable no-loop-func */
/* --- Part Two ---
It seems you're on the right track. Finish simulating the process and figure out where the Elves need to go. How many rounds did you save them?

In the example above, the first round where no Elf moved was round 20:

.......#......
....#......#..
..#.....#.....
......#.......
...#....#.#..#
#.............
....#.....#...
..#.....#.....
....#.#....#..
.........#....
....#......#..
.......#......
Figure out where the Elves need to go. What is the number of the first round where no Elf moves?
*/
import { Directions, directionsMapping } from "./interface";
import { findElves, checkIfElvesAround } from "./utils";
import { findAvailableSpot } from "./task-1";

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-23/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n").map((i) => i.split(""));

const simulateDiffusion = (data: string[]): number | boolean => {
  let map = [...data];
  let currDir = Directions.N;

  const steps = 1000;

  for (let k = 1; k < steps; k++) {
    let moved = false;
    const elvesPropositions = new Map();
    map.forEach((elf) => {
      const [i, j] = elf.split(";");
      if (checkIfElvesAround(Number(i), Number(j), map)) {
        moved = true;
        const { iM, jM } = findAvailableSpot(
          map,
          Number(i),
          Number(j),
          currDir
        );
        elvesPropositions.has(`${iM};${jM}`)
          ? elvesPropositions.delete(`${iM};${jM}`)
          : elvesPropositions.set(`${iM};${jM}`, elf);
      }
    });
    if (!moved) return k;
    elvesPropositions.forEach((key, value) => {
      map = map.filter((item) => item !== key);
      map.push(value);
    });
    // eslint-disable-next-line prefer-destructuring
    currDir = directionsMapping[currDir][1];
  }
  return false;
};

console.log(simulateDiffusion(findElves(input)));
