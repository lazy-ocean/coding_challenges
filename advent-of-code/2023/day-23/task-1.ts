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

/* const START = `0;1`;
const FINISH = "22;21"; */
const START = `0;1`;
const FINISH = "140;139";

const top = ([i, j]) => (input[i - 1] ? [i - 1, j] : null);
const bottom = ([i, j]) => (input[i + 1] ? [i + 1, j] : null);
const left = ([i, j]) => (j > 0 ? [i, j - 1] : null);
const right = ([i, j]) => (j < input[i].length ? [i, j + 1] : null);

const findPaths = () => {
  let maxSteps = Number.MIN_SAFE_INTEGER;

  const stack = [{ node: START, steps: 0, visited: [] }];

  while (stack.length > 0) {
    const { node, steps, visited } = stack.pop();

    visited.push(node);
    const currentNode = node.split(";").map(Number);

    if (node === FINISH) {
      console.log(steps);
      if (steps > maxSteps) maxSteps = steps;
      continue;
    }

    let nextSteps = [];

    const curr = input[currentNode[0]][currentNode[1]];

    switch (curr) {
      case ">":
        nextSteps.push(right(currentNode as [number, number]));
        break;
      case "v":
        nextSteps.push(bottom(currentNode as [number, number]));
        break;
      case "<":
        nextSteps.push(left(currentNode as [number, number]));
        break;
      case "^":
        nextSteps.push(top(currentNode as [number, number]));
        break;
      default:
        nextSteps = [
          top(currentNode as [number, number]),
          bottom(currentNode as [number, number]),
          left(currentNode as [number, number]),
          right(currentNode as [number, number]),
        ];
        break;
    }

    if (nextSteps.filter(Boolean)) {
      nextSteps.filter(Boolean).forEach(([i, j]) => {
        const item = input[i][j];
        if (item !== "#" && !visited.includes(`${i};${j}`)) {
          stack.push({
            node: `${i};${j}`,
            steps: steps + 1,
            visited: [...visited],
          });
        }
      });
    }
  }

  return maxSteps;
};

console.log(findPaths());
