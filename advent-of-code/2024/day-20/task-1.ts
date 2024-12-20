/* --- Day 20: Race Condition ---
The Historians are quite pixelated again. This time, a massive, black building looms over you - you're right outside the CPU!

While The Historians get to work, a nearby program sees that you're idle and challenges you to a race. Apparently, you've arrived just in time for the frequently-held race condition festival!

The race takes place on a particularly long and twisting code path; programs compete to see who can finish in the fewest picoseconds. The winner even gets their very own mutex!

They hand you a map of the racetrack (your puzzle input). For example:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
The map consists of track (.) - including the start (S) and end (E) positions (both of which also count as track) - and walls (#).

When a program runs through the racetrack, it starts at the start position. Then, it is allowed to move up, down, left, or right; each such move takes 1 picosecond. The goal is to reach the end position as quickly as possible. In this example racetrack, the fastest time is 84 picoseconds.

Because there is only a single path from the start to the end and the programs all go the same speed, the races used to be pretty boring. To make things more interesting, they introduced a new rule to the races: programs are allowed to cheat.

The rules for cheating are very strict. Exactly once during a race, a program may disable collision for up to 2 picoseconds. This allows the program to pass through walls as if they were regular track. At the end of the cheat, the program must be back on normal track again; otherwise, it will receive a segmentation fault and get disqualified.

So, a program could complete the course in 72 picoseconds (saving 12 picoseconds) by cheating for the two moves marked 1 and 2:

###############
#...#...12....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
Or, a program could complete the course in 64 picoseconds (saving 20 picoseconds) by cheating for the two moves marked 1 and 2:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...12..#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
This cheat saves 38 picoseconds:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.####1##.###
#...###.2.#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
This cheat saves 64 picoseconds and takes the program directly to the end:

###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..21...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
Each cheat has a distinct start position (the position where the cheat is activated, just before the first move that is allowed to go through walls) and end position; cheats are uniquely identified by their start position and end position.

In this example, the total number of cheats (grouped by the amount of time they save) are as follows:

There are 14 cheats that save 2 picoseconds.
There are 14 cheats that save 4 picoseconds.
There are 2 cheats that save 6 picoseconds.
There are 4 cheats that save 8 picoseconds.
There are 2 cheats that save 10 picoseconds.
There are 3 cheats that save 12 picoseconds.
There is one cheat that saves 20 picoseconds.
There is one cheat that saves 36 picoseconds.
There is one cheat that saves 38 picoseconds.
There is one cheat that saves 40 picoseconds.
There is one cheat that saves 64 picoseconds.
You aren't sure what the conditions of the racetrack will be like, so to give yourself as many options as possible, you'll need a list of the best cheats. How many cheats would save you at least 100 picoseconds?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-20/data.txt",
  "utf8",
  () => null
);

let cheat = "";

let start = null;
let finish = null;

const data = dataset.split("\n").map((line, i) => {
  const arr = line.split("");
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === "S") start = [i, j];
    if (arr[j] === "E") finish = [i, j];
  }
  return arr;
});

const visited = [];

const getNeighbours = ([x, y]) => {
  const neighbours = [];

  if (data[x][y + 1] && (data[x][y + 1] !== "#" || cheat === `${x};${y + 1}`)) {
    if (!neighbours.includes(`${x};${y + 1}`)) neighbours.push([x, y + 1, 1]);
  }

  if (data[x][y - 1] && (data[x][y - 1] !== "#" || cheat === `${x};${y - 1}`)) {
    if (!neighbours.includes(`${x};${y - 1}`)) neighbours.push([x, y - 1, 1]);
  }

  if (data[x + 1] && (data[x + 1][y] !== "#" || cheat === `${x + 1};${y}`)) {
    if (!neighbours.includes(`${x + 1};${y}`)) neighbours.push([x + 1, y, 1]);
  }

  if (data[x - 1] && (data[x - 1][y] !== "#" || cheat === `${x - 1};${y}`)) {
    if (!neighbours.includes(`${x - 1};${y}`)) neighbours.push([x - 1, y, 1]);
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

    if (x === finish[0] && y === finish[1]) {
      return distancesMap[`${finish[0]};${finish[1]}`];
    }

    const neighbours = getNeighbours([x, y]);
    if (neighbours.length) {
      for (let i = 0; i < neighbours.length; i++) {
        const [nx, ny, nprice] = neighbours[i];

        const newPrice = nprice + price;

        const mapPrice = distancesMap[`${nx};${ny}`] || Infinity;

        visited.push(`${x};${y}`);

        if (newPrice < mapPrice) {
          distancesMap[`${nx};${ny}`] = newPrice;
          nodes.push([nx, ny, newPrice]);
        }
      }
    }
  }

  return -1;
};

const normal = makeSteps(start);

const fuckAround = () => {
  const map = {};

  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[0].length - 1; j++) {
      if (getNeighbours([i, j]).length > 1 && data[i][j] === "#") {
        cheat = `${i};${j}`;
        if (makeSteps(start) !== -1) {
          const diff = normal - makeSteps(start);
          if (diff >= 100) {
            map[diff] = map[diff] ? map[diff] + 1 : 1;
          }
        }
      }
    }
  }
  return map;
};

console.log(fuckAround);
