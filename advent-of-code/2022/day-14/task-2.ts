/* --- Part Two ---
You realize you misread the scan. There isn't an endless void at the bottom of the scan - there's floor, and you're standing on it!

You don't have time to scan the floor, so assume the floor is an infinite horizontal line with a y coordinate equal to two plus the highest y coordinate of any point in your scan.

In the example above, the highest y coordinate of any point is 9, and so the floor is at y=11. (This is as if your scan contained one extra rock path like -infinity,11 -> infinity,11.) With the added floor, the example above now looks like this:

        ...........+........
        ....................
        ....................
        ....................
        .........#...##.....
        .........#...#......
        .......###...#......
        .............#......
        .............#......
        .....#########......
        ....................
<-- etc #################### etc -->
To find somewhere safe to stand, you'll need to simulate falling sand until a unit of sand comes to rest at 500,0, blocking the source entirely and stopping the flow of sand into the cave. In the example above, the situation finally looks like this after 93 units of sand come to rest:

............o............
...........ooo...........
..........ooooo..........
.........ooooooo.........
........oo#ooo##o........
.......ooo#ooo#ooo.......
......oo###ooo#oooo......
.....oooo.oooo#ooooo.....
....oooooooooo#oooooo....
...ooo#########ooooooo...
..ooooo.......ooooooooo..
#########################
Using your scan, simulate the falling sand until the source of the sand becomes blocked. How many units of sand come to rest?
 */
import FloorMap from "./task-1";

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-14/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n");

const buildMap = (data: string[]): { floor: number; map: FloorMap } => {
  const map = {};
  let maxY = Number.MIN_SAFE_INTEGER;

  data.forEach((line: string) => {
    const rocks = line.split(" -> ");
    for (let i = 0; i < rocks.length - 1; i++) {
      let [x1, y1] = rocks[i].split(",").map(Number);
      const [x2, y2] = rocks[i + 1].split(",").map(Number);
      if (x1 === x2) {
        while (y1 !== y2) {
          if (!map[y1]) map[y1] = new Set();
          map[y1].add(Number(x1));
          if (y1 > maxY) maxY = y1;
          y2 > y1 ? y1++ : y1--;
        }
      }
      if (y1 === y2) {
        if (y1 > maxY) maxY = y1;
        if (!map[y1]) map[y1] = new Set();
        while (x1 !== x2) {
          map[y1].add(Number(x1));
          x2 > x1 ? x1++ : x1--;
        }
        map[y1].add(Number(x1));
      }
    }
  });
  return { map, floor: maxY + 2 };
};

const simulateSandfall = ({
  map,
  floor,
}: {
  map: FloorMap;
  floor: number;
}): number => {
  const [xSand, ySand] = [500, 0];
  let counter = 0;

  const simulateFall = (): boolean => {
    let xS = xSand;
    let yS = ySand;
    let availableSpace = true;
    let steps = 0;

    while (availableSpace && !map[ySand]?.has(xSand)) {
      const isFloorBelow = yS + 1 === floor;
      const isBlockedBelow = map[yS + 1]?.has(xS);
      const isBlockedLeft = map[yS + 1]?.has(xS - 1);
      const isBlockedRight = map[yS + 1]?.has(xS + 1);

      if (isFloorBelow) {
        if (!map[yS]) map[yS] = new Set();
        map[yS].add(xS);
        counter++;
        availableSpace = false;
        return true;
      }

      if (isBlockedBelow) {
        if (isBlockedLeft && isBlockedRight) {
          if (!map[yS]) map[yS] = new Set();
          map[yS].add(xS);
          counter++;
          availableSpace = false;
          return true;
        }
        if (!isBlockedLeft) {
          yS += 1;
          xS -= 1;
        } else {
          yS += 1;
          xS += 1;
        }
      } else yS += 1;
      steps++;
    }
    return false;
  };

  let ind = true;
  while (ind) {
    ind = simulateFall();
  }

  return counter;
};

console.log(simulateSandfall(buildMap(input)));
