/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* --- Day 23: A Long Walk ---
The Elves resume water filtering operations! Clean water starts flowing over the edge of Island Island.

They offer to help you go over the edge of Island Island, too! Just hold on tight to one end of this impossibly long rope and they'll lower you down a safe distance from the massive waterfall you just created.

As you finally reach Snow Island, you see that the water isn't really reaching the ground: it's being absorbed by the air itself. It looks like you'll finally have a little downtime while the moisture builds up to snow-producing levels. Snow Island is pretty scenic, even without any snow; why not take a walk?

There's a map of nearby hiking trails (your puzzle input) that indicates paths (.), forest (#), and steep slopes (^, >, v, and <).

For example:

#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#
You're currently on the single path tile in the top row; your goal is to reach the single path tile in the bottom row. Because of all the mist from the waterfall, the slopes are probably quite icy; if you step onto a slope tile, your next step must be downhill (in the direction the arrow is pointing). To make sure you have the most scenic hike possible, never step onto the same tile twice. What is the longest hike you can take?

In the example above, the longest hike you can take is marked with O, and your starting position is marked S:

#S#####################
#OOOOOOO#########...###
#######O#########.#.###
###OOOOO#OOO>.###.#.###
###O#####O#O#.###.#.###
###OOOOO#O#O#.....#...#
###v###O#O#O#########.#
###...#O#O#OOOOOOO#...#
#####.#O#O#######O#.###
#.....#O#O#OOOOOOO#...#
#.#####O#O#O#########v#
#.#...#OOO#OOO###OOOOO#
#.#.#v#######O###O###O#
#...#.>.#...>OOO#O###O#
#####v#.#.###v#O#O###O#
#.....#...#...#O#O#OOO#
#.#########.###O#O#O###
#...###...#...#OOO#O###
###.###.#.###v#####O###
#...#...#.#.>.>.#.>O###
#.###.###.#.###.#.#O###
#.....###...###...#OOO#
#####################O#
This hike contains 94 steps. (The other possible hikes you could have taken were 90, 86, 82, 82, and 74 steps long.)

Find the longest hike you can take through the hiking trails listed on your map. How many steps long is the longest hike?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-23/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n").map((line) => line.split(""));

const START = `0;1`;
const FINISH = "140;139";

const top = ([i, j]) => (input[i - 1] ? [i - 1, j] : null);
const bottom = ([i, j]) => (input[i + 1] ? [i + 1, j] : null);
const left = ([i, j]) => (j > 0 ? [i, j - 1] : null);
const right = ([i, j]) => (j < input[i].length ? [i, j + 1] : null);

const getNextPaths = (node, graph, visited) => {
  visited.add(node.position);
  const currentNode = node.position.split(";").map(Number);
  const nextSteps = [
    top(currentNode as [number, number]),
    bottom(currentNode as [number, number]),
    left(currentNode as [number, number]),
    right(currentNode as [number, number]),
  ];
  const paths = [];

  nextSteps.filter(Boolean).forEach(([i, j]) => {
    if (input[i][j] !== "#") {
      if (visited.has(`${i};${j}`)) {
        if (
          Object.keys(graph).includes(`${i};${j}`) &&
          `${i};${j}` !== currentNode.multWays
        ) {
          graph[node.multWays][`${i};${j}`] = node.distance.length + 1;
          graph[`${i};${j}`][node.multWays] = node.distance.length + 1;
        }
      } else
        paths.push({
          position: `${i};${j}`,
          distance: [...node.distance, node.position],
          multWays: node.multWays,
        });
    }
  });

  if (paths.length > 1) {
    if (!graph[node.position]) {
      graph[node.position] = {};
    }
    graph[node.multWays][node.position] = node.distance.length;
    graph[node.position][node.multWays] = node.distance.length;
    paths.forEach((path) => {
      path.multWays = node.position;
      path.distance = [node.position];
    });
  }

  return paths;
};

const createGraph = () => {
  const visited = new Set();
  const graph = { [START]: {} };

  let paths = [
    {
      position: START,
      multWays: START,
      distance: [],
    },
  ];

  while (paths.length > 0) {
    const curr = paths.pop();

    if (curr.position === FINISH) {
      graph[curr.multWays][curr.position] = curr.distance.length;
    } else paths = [...paths, ...getNextPaths(curr, graph, visited)];
  }
  return graph;
};

const findPaths = (graph) => {
  const visited = new Set();

  const traverse = (currentNode, steps) => {
    if (currentNode === FINISH) return steps;

    visited.add(currentNode);

    let maxSteps = Number.MIN_SAFE_INTEGER;

    Object.keys(graph[currentNode]).forEach((key) => {
      if (!visited.has(key)) {
        const newSteps = steps + graph[currentNode][key];
        const pathLength = traverse(key, newSteps);
        maxSteps = Math.max(maxSteps, pathLength);
      }
    });

    visited.delete(currentNode);

    return maxSteps;
  };

  return traverse(START, 0);
};

console.log(findPaths(createGraph()));
