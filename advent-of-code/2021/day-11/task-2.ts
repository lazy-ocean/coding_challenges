/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* --- Day 11: Dumbo Octopus ---
--- Part Two ---
It seems like the individual flashes aren't bright enough to navigate. However, you might have a better option: the flashes seem to be synchronizing!

In the example above, the first time all octopuses flash simultaneously is step 195:

After step 193:
5877777777
8877777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777

After step 194:
6988888888
9988888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888

After step 195:
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
If you can calculate the exact moments when the octopuses will all flash simultaneously, you should be able to navigate through the cavern. What is the first step during which all octopuses flash?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-11/data.txt",
  "utf8",
  () => null
);

const input: number[][] = dataset
  .split("\n")
  .map((line) => line.split("").map(Number));

type OctopusState = any;

const countFlashes = (data: number[][]) => {
  let octopuses: OctopusState[][] = [...data];
  let steps = 1;

  const flashed = (i: number, j: number) => {
    if (octopuses[i - 1]) {
      if (typeof octopuses[i - 1][j - 1] === "number") {
        if (octopuses[i - 1][j - 1] === 9) {
          octopuses[i - 1][j - 1] = "flashed";
          flashed(i - 1, j - 1);
        } else octopuses[i - 1][j - 1]++;
      }
      if (typeof octopuses[i - 1][j] === "number") {
        if (octopuses[i - 1][j] === 9) {
          octopuses[i - 1][j] = "flashed";
          flashed(i - 1, j);
        } else octopuses[i - 1][j]++;
      }
      if (typeof octopuses[i - 1][j + 1] === "number") {
        if (octopuses[i - 1][j + 1] === 9) {
          octopuses[i - 1][j + 1] = "flashed";
          flashed(i - 1, j + 1);
        } else octopuses[i - 1][j + 1]++;
      }
    }
    if (typeof octopuses[i][j - 1] === "number") {
      if (octopuses[i][j - 1] === 9) {
        octopuses[i][j - 1] = "flashed";
        flashed(i, j - 1);
      } else octopuses[i][j - 1]++;
    }
    if (typeof octopuses[i][j + 1] === "number") {
      if (octopuses[i][j + 1] === 9) {
        octopuses[i][j + 1] = "flashed";
        flashed(i, j + 1);
      } else octopuses[i][j + 1]++;
    }
    if (octopuses[i + 1]) {
      if (typeof octopuses[i + 1][j - 1] === "number") {
        if (octopuses[i + 1][j - 1] === 9) {
          octopuses[i + 1][j - 1] = "flashed";
          flashed(i + 1, j - 1);
        } else octopuses[i + 1][j - 1]++;
      }
      if (typeof octopuses[i + 1][j] === "number") {
        if (octopuses[i + 1][j] === 9) {
          octopuses[i + 1][j] = "flashed";
          flashed(i + 1, j);
        } else octopuses[i + 1][j]++;
      }
      if (typeof octopuses[i + 1][j + 1] === "number") {
        if (octopuses[i + 1][j + 1] === 9) {
          octopuses[i + 1][j + 1] = "flashed";
          flashed(i + 1, j + 1);
        } else octopuses[i + 1][j + 1]++;
      }
    }
  };

  while (steps <= 1000) {
    let flashes = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (octopuses[i][j] === 9) {
          octopuses[i][j] = "flashed";
          flashed(i, j);
        } else if (typeof octopuses[i][j] === "number") octopuses[i][j]++;
      }
    }
    octopuses = octopuses.map((line) =>
      line.map((item) => {
        if (item === "flashed") {
          flashes++;
          return 0;
        }
        return item;
      })
    );
    if (flashes === 100) return steps;
    steps++;
  }
  return octopuses;
};

console.log(countFlashes(input));
