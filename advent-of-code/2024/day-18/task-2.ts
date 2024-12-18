/* --- Part Two ---
The Historians aren't as used to moving around in this pixelated universe as you are. You're afraid they're not going to be fast enough to make it to the exit before the path is completely blocked.

To determine how fast everyone needs to go, you need to determine the first byte that will cut off the path to the exit.

In the above example, after the byte at 1,1 falls, there is still a path to the exit:

O..#OOO
O##OO#O
O#OO#OO
OOO#OO#
###OO##
.##O###
#.#OOOO
However, after adding the very next byte (at 6,1), there is no longer a path to the exit:

...#...
.##..##
.#..#..
...#..#
###..##
.##.###
#.#....
So, in this example, the coordinates of the first byte that prevents the exit from being reachable are 6,1.

Simulate more of the bytes that are about to corrupt your memory space. What are the coordinates of the first byte that will prevent the exit from being reachable from your starting position? (Provide the answer as two integers separated by a comma with no other characters.)
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-18/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n");
const corruptedBytesData = input.slice(0, 1024);
const restBytes = input.slice(1024);
const corruptedBytes = [...corruptedBytesData];

const gridmax = 70;

const getNeighbours = ([x, y]) => {
  const neighbours = [];

  if (y + 1 <= gridmax && !corruptedBytes.includes(`${y + 1},${x}`)) {
    neighbours.push([x, y + 1, 1]);
  }

  if (y - 1 >= 0 && !corruptedBytes.includes(`${y - 1},${x}`)) {
    neighbours.push([x, y - 1, 1]);
  }

  if (x + 1 <= gridmax && !corruptedBytes.includes(`${y},${x + 1}`)) {
    neighbours.push([x + 1, y, 1]);
  }

  if (x - 1 >= 0 && !corruptedBytes.includes(`${y},${x - 1}`)) {
    neighbours.push([x - 1, y, 1]);
  }

  return neighbours;
};

const makeSteps = ([startX, startY]) => {
  const distancesMap = {};

  const nodes = [[startX, startY, 0]];

  distancesMap[`${startX};${startY}`] = 0;

  while (nodes.length) {
    nodes.sort((a, b) => a[2] - b[2]);

    const nextNode = nodes.shift();
    const [x, y, price] = nextNode;

    if (x === gridmax && y === gridmax) {
      return distancesMap[`${gridmax};${gridmax}`];
    }

    const neighbours = getNeighbours([x, y]);
    if (neighbours.length) {
      for (let i = 0; i < neighbours.length; i++) {
        const [nx, ny, nprice] = neighbours[i];

        const newPrice = nprice + price;

        const mapPrice = distancesMap[`${nx};${ny}`] || Infinity;

        if (newPrice < mapPrice) {
          distancesMap[`${nx};${ny}`] = newPrice;
          nodes.push([nx, ny, newPrice]);
        }
      }
    }
  }

  return -1;
};

const fuckAround = () => {
  while (restBytes.length) {
    const curr = restBytes.shift();
    corruptedBytes.push(curr);
    if (makeSteps([0, 0]) === -1) return curr;
  }
};

console.log(fuckAround());
