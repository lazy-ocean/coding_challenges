/* --- Part Two ---
Now, the Elves just need help accessing as much of the paper as they can.

Once a roll of paper can be accessed by a forklift, it can be removed. Once a roll of paper is removed, the forklifts might be able to access more rolls of paper, which they might also be able to remove. How many total rolls of paper could the Elves remove if they keep repeating this process?

Starting with the same example as above, here is one way you could remove as many rolls of paper as possible, using highlighted @ to indicate that a roll of paper is about to be removed, and using x to indicate that a roll of paper was just removed:

Initial state:
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

Remove 13 rolls of paper:
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.

Remove 12 rolls of paper:
.......x..
.@@.x.x.@x
x@@@@...@@
x.@@@@..x.
.@.@@@@.x.
.x@@@@@@.x
.x.@.@.@@@
..@@@.@@@@
.x@@@@@@@.
....@@@...

Remove 7 rolls of paper:
..........
.x@.....x.
.@@@@...xx
..@@@@....
.x.@@@@...
..@@@@@@..
...@.@.@@x
..@@@.@@@@
..x@@@@@@.
....@@@...

Remove 5 rolls of paper:
..........
..x.......
.x@@@.....
..@@@@....
...@@@@...
..x@@@@@..
...@.@.@@.
..x@@.@@@x
...@@@@@@.
....@@@...

Remove 2 rolls of paper:
..........
..........
..x@@.....
..@@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@x.
....@@@...

Remove 1 roll of paper:
..........
..........
...@@.....
..x@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
...x@.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
....x.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
..........
...x@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...
Stop once no more rolls of paper are accessible by a forklift. In this example, a total of 43 rolls of paper can be removed.

Start with your original diagram. How many rolls of paper in total can be removed by the Elves and their forklifts?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2025/day-4/data.txt",
  "utf8",
  () => null
);

const data = dataset.split("\n").reduce((acc, line, i) => {
  const rolls = new Set();
  line.split("").forEach((item, idx) => {
    if (item === "@") rolls.add(idx);
  });
  acc[i] = rolls;
  return acc;
}, {});

const findNeighbours = (i: number, j: number) => {
  const input = data;
  const neighbours = [];

  if (input[i - 1]) {
    if (input[i - 1].has(j - 1)) neighbours.push([i - 1, j - 1]);
    if (input[i - 1].has(j)) neighbours.push([i - 1, j]);
    if (input[i - 1].has(j + 1)) neighbours.push([i - 1, j + 1]);
  }

  if (input[i + 1]) {
    if (input[i + 1].has(j - 1)) neighbours.push([i + 1, j - 1]);
    if (input[i + 1].has(j)) neighbours.push([i + 1, j]);
    if (input[i + 1].has(j + 1)) neighbours.push([i + 1, j + 1]);
  }

  if (input[i].has(j - 1)) neighbours.push([i, j - 1]);
  if (input[i].has(j + 1)) neighbours.push([i, j + 1]);

  return neighbours;
};

const input = dataset.split("\n").reduce((acc, line, i) => {
  const rolls = [];
  line.split("").forEach((item, idx) => {
    if (item === "@") rolls.push(idx);
  });

  const map = rolls.reduce((acc1, roll) => {
    acc1[roll] = {
      neighbours: [],
    };
    return acc1;
  }, {});

  acc[i] = map;
  return acc;
}, {});

Object.keys(data).forEach((key) => {
  const rolls = data[key];
  rolls.forEach((roll) => {
    const neighboursIndices = findNeighbours(Number(key), Number(roll));
    const neighbours = neighboursIndices.map(([i, j]) => input[i][j]);
    input[key][roll].neighbours = neighbours;
  });
});

let sum = 0;

const countValidRolls = () => {
  let swapped = true;
  while (swapped) {
    swapped = false;

    Object.keys(input).forEach((key) => {
      const js = input[key];
      Object.keys(js).forEach((item) => {
        const { neighbours } = js[item];
        const filtered = neighbours.filter((n) => !n.deleted);
        if (filtered.length < 4) {
          js[item].deleted = true;
          delete js[item];
          sum++;
          swapped = true;
        }
      });
    });
  }
  return sum;
};

console.log(countValidRolls());
