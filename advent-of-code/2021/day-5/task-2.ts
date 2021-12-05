/* eslint-disable no-unused-expressions */
/* --- Day 5: Hydrothermal Venture ---
--- Part Two ---
Unfortunately, considering only horizontal and vertical lines doesn't give you the full picture; you need to also consider diagonal lines.

Because of the limits of the hydrothermal vent mapping system, the lines in your list will only ever be horizontal, vertical, or a diagonal line at exactly 45 degrees. In other words:

An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
Considering all lines from the above example would now produce the following diagram:

1.1....11.
.111...2..
..2.1.111.
...1.2.2..
.112313211
...1.2....
..1...1...
.1.....1..
1.......1.
222111....
You still need to determine the number of points where at least two lines overlap. In the above example, this is still anywhere in the diagram with a 2 or larger - now a total of 12 points.

Consider all of the lines. At how many points do at least two lines overlap?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-5/data.txt",
  "utf8",
  () => null
);

interface Coordinate {
  x1: number;
  x2: number;
  y2: number;
  y1: number;
}

const input: Coordinate[] = dataset.split("\n").reduce((acc, line) => {
  const [first, second] = line.split(" -> ");
  const [x1, y1] = first.split(",").map(Number);
  const [x2, y2] = second.split(",").map(Number);
  const coordinates = { x1, x2, y1, y2 };
  acc.push(coordinates);
  return acc;
}, []);

const findDangerousAreas = (data: Coordinate[]) => {
  let dangerousAreas = 0;
  const visitedCoordinates = {};

  const check = (i: number, j: number) => {
    if (!visitedCoordinates[i]) {
      visitedCoordinates[i] = { [j]: 0 };
    } else if (!visitedCoordinates[i][j]) {
      visitedCoordinates[i][j] = 0;
    } else if (visitedCoordinates[i][j] === 1) {
      dangerousAreas++;
    }
    visitedCoordinates[i][j]++;
  };

  data.forEach(({ x1, x2, y1, y2 }) => {
    let i = x1;
    let j = y1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (i === x2 && j === y2) {
        check(i, j);
        return;
      }
      check(i, j);
      if (i !== x2) i = i < x2 ? i + 1 : i - 1;
      if (j !== y2) j = j < y2 ? j + 1 : j - 1;
    }
  });
  return dangerousAreas;
};

console.log(findDangerousAreas(input));
