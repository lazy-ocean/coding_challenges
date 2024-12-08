/* --- Part Two ---
Watching over your shoulder as you work, one of The Historians asks if you took the effects of resonant harmonics into your calculations.

Whoops!

After updating your model, it turns out that an antinode occurs at any grid position exactly in line with at least two antennas of the same frequency, regardless of distance. This means that some of the new antinodes will occur at the position of each antenna (unless that antenna is the only one of its frequency).

So, these three T-frequency antennas now create many antinodes:

T....#....
...T......
.T....#...
.........#
..#.......
..........
...#......
..........
....#.....
..........
In fact, the three T-frequency antennas are all exactly in line with two antennas, so they are all also antinodes! This brings the total number of antinodes in the above example to 9.

The original example now has 34 antinodes, including the antinodes that appear on every antenna:

##....#....#
.#.#....0...
..#.#0....#.
..##...0....
....0....#..
.#...#A....#
...#..#.....
#....#.#....
..#.....A...
....#....A..
.#........#.
...#......##
Calculate the impact of the signal using this updated model. How many unique locations within the bounds of the map contain an antinode?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-8/data.txt",
  "utf8",
  () => null
);

const input: string[][] = dataset.split("\n").map((line) => line.split(""));

const locationsMap = {};

input.forEach((line, i) => {
  line.forEach((item, j) => {
    if (item !== ".") {
      if (locationsMap[item]) {
        locationsMap[item].push([i, j]);
      } else locationsMap[item] = [[i, j]];
    }
  });
});

const checkIfWithinBounds = (dot: number[]) => {
  const [x, y] = dot;

  return x >= 0 && x < input.length && y >= 0 && y < input[0].length;
};

const findNextFrequences = ({
  dot1,
  dot2,
}: {
  dot1: number[];
  dot2: number[];
}): number[][] => {
  const [x1, y1] = dot1;
  const [x2, y2] = dot2;

  let currx1 = x1;
  let curry1 = y1;
  let currx2 = x2;
  let curry2 = y2;

  const nexts = [];
  const nextups = [];

  const distX = x2 - x1;
  const distY = y2 - y1;

  while (true) {
    const next = [currx2 + distX, curry2 + distY];
    if (checkIfWithinBounds(next)) {
      nexts.push(`${next[0]};${next[1]}`);
      [currx2, curry2] = next;
    } else break;
  }

  while (true) {
    const nextup = [currx1 - distX, curry1 - distY];
    if (checkIfWithinBounds(nextup)) {
      nextups.push(`${nextup[0]};${nextup[1]}`);
      [currx1, curry1] = nextup;
    } else break;
  }

  return [nexts, nextups];
};

const findAllFrequences = (): number => {
  const res = new Set();

  Object.keys(locationsMap).forEach((antenna) => {
    const alllocations = locationsMap[antenna];
    const parsed = alllocations.map((loc: number[]) => `${loc[0]};${loc[1]}`);

    parsed.forEach((item: string) => res.add(item));
    for (let i = 0; i < alllocations.length; i++) {
      const dot1 = alllocations[i];

      for (let j = i + 1; j < alllocations.length; j++) {
        const dot2 = alllocations[j];
        const [ups, downs] = findNextFrequences({ dot1, dot2 });

        [...ups, ...downs].forEach((item) => res.add(item));
      }
    }
  });

  return res.size;
};

console.log(findAllFrequences());
