/* --- Day 16: Reindeer Maze ---
It's time again for the Reindeer Olympics! This year, the big event is the Reindeer Maze, where the Reindeer compete for the lowest score.

You and The Historians arrive to search for the Chief right as the event is about to start. It wouldn't hurt to watch a little, right?

The Reindeer start on the Start Tile (marked S) facing East and need to reach the End Tile (marked E). They can move forward one tile at a time (increasing their score by 1 point), but never into a wall (#). They can also rotate clockwise or counterclockwise 90 degrees at a time (increasing their score by 1000 points).

To figure out the best place to sit, you start by grabbing a map (your puzzle input) from a nearby kiosk. For example:

###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
There are many paths through this maze, but taking any of the best paths would incur a score of only 7036. This can be achieved by taking a total of 36 steps forward and turning 90 degrees a total of 7 times:


###############
#.......#....E#
#.#.###.#.###^#
#.....#.#...#^#
#.###.#####.#^#
#.#.#.......#^#
#.#.#####.###^#
#..>>>>>>>>v#^#
###^#.#####v#^#
#>>^#.....#v#^#
#^#.#.###.#v#^#
#^....#...#v#^#
#^###.#.#.#v#^#
#S..#.....#>>^#
###############
Here's a second example:

#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
In this maze, the best paths cost 11048 points; following one such path would look like this:

#################
#...#...#...#..E#
#.#.#.#.#.#.#.#^#
#.#.#.#...#...#^#
#.#.#.#.###.#.#^#
#>>v#.#.#.....#^#
#^#v#.#.#.#####^#
#^#v..#.#.#>>>>^#
#^#v#####.#^###.#
#^#v#..>>>>^#...#
#^#v###^#####.###
#^#v#>>^#.....#.#
#^#v#^#####.###.#
#^#v#^........#.#
#^#v#^#########.#
#S#>>^..........#
#################
Note that the path shown above includes one 90 degree turn as the very first move, rotating the Reindeer from facing East to facing North.

Analyze your map carefully. What is the lowest score a Reindeer could possibly get?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-16/data.txt",
  "utf8",
  () => null
);

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

enum Direction {
  horizontal = "horizontal",
  vertical = "vertical",
}

const getNeighbours = ([x, y], direction) => {
  const neighbours = [];

  if (data[x][y + 1] && data[x][y + 1] !== "#") {
    const price = direction === Direction.vertical ? 1001 : 1;
    const newDir = Direction.horizontal;
    neighbours.push([x, y + 1, price, newDir]);
  }

  if (data[x][y - 1] && data[x][y - 1] !== "#") {
    const price = direction === Direction.vertical ? 1001 : 1;
    const newDir = Direction.horizontal;
    neighbours.push([x, y - 1, price, newDir]);
  }

  if (data[x + 1] && data[x + 1][y] !== "#") {
    const price = direction === Direction.horizontal ? 1001 : 1;
    const newDir = Direction.vertical;
    neighbours.push([x + 1, y, price, newDir]);
  }

  if (data[x - 1] && data[x - 1][y] !== "#") {
    const price = direction === Direction.horizontal ? 1001 : 1;
    const newDir = Direction.vertical;
    neighbours.push([x - 1, y, price, newDir]);
  }

  return neighbours;
};

const makeSteps = ([startX, startY]) => {
  const distancesMap = {};

  const nodes = [[startX, startY, 0, Direction.horizontal]];

  distancesMap[`${startX};${startY}`] = 0;

  while (nodes.length) {
    nodes.sort((a, b) => a[2] - b[2]);

    const nextNode = nodes.shift();
    const [x, y, price, direction] = nextNode;

    if (data[x][y] === "E") {
      return distancesMap[`${finish[0]};${finish[1]}`];
    }

    const neighbours = getNeighbours([x, y], direction);

    if (neighbours.length) {
      for (let i = 0; i < neighbours.length; i++) {
        const [nx, ny, nprice, dir] = neighbours[i];

        const newPrice = nprice + price;

        const mapPrice = distancesMap[`${nx};${ny}`] || Infinity;

        if (newPrice < mapPrice) {
          distancesMap[`${nx};${ny}`] = newPrice;
          nodes.push([nx, ny, newPrice, dir]);
        }
      }
    }
  }

  return -1;
};

console.log(makeSteps(start));
