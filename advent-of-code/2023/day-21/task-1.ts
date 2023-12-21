/* eslint-disable no-loop-func */
/* --- Day 21: Step Counter ---
You manage to catch the airship right as it's dropping someone else off on their all-expenses-paid trip to Desert Island! It even helpfully drops you off near the gardener and his massive farm.

"You got the sand flowing again! Great work! Now we just need to wait until we have enough sand to filter the water for Snow Island and we'll have snow again in no time."

While you wait, one of the Elves that works with the gardener heard how good you are at solving problems and would like your help. He needs to get his steps in for the day, and so he'd like to know which garden plots he can reach with exactly his remaining 64 steps.

He gives you an up-to-date map (your puzzle input) of his starting position (S), garden plots (.), and rocks (#). For example:

...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
The Elf starts at the starting position (S) which also counts as a garden plot. Then, he can take one step north, south, east, or west, but only onto tiles that are garden plots. This would allow him to reach any of the tiles marked O:

...........
.....###.#.
.###.##..#.
..#.#...#..
....#O#....
.##.OS####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
Then, he takes a second step. Since at this point he could be at either tile marked O, his second step would allow him to reach any garden plot that is one step north, south, east, or west of any tile that he could have reached after the first step:

...........
.....###.#.
.###.##..#.
..#.#O..#..
....#.#....
.##O.O####.
.##.O#...#.
.......##..
.##.#.####.
.##..##.##.
...........
After two steps, he could be at any of the tiles marked O above, including the starting position (either by going north-then-south or by going west-then-east).

A single third step leads to even more possibilities:

...........
.....###.#.
.###.##..#.
..#.#.O.#..
...O#O#....
.##.OS####.
.##O.#...#.
....O..##..
.##.#.####.
.##..##.##.
...........
He will continue like this until his steps for the day have been exhausted. After a total of 6 steps, he could reach any of the garden plots marked O:

...........
.....###.#.
.###.##.O#.
.O#O#O.O#..
O.O.#.#.O..
.##O.O####.
.##.O#O..#.
.O.O.O.##..
.##.#.####.
.##O.##.##.
...........
In this example, if the Elf's goal was to get exactly 6 more steps today, he could use them to reach any of 16 garden plots.

However, the Elf actually needs to get 64 steps today, and the map he's handed you is much larger than the example map.

Starting from the garden plot marked S on your map, how many garden plots could the Elf reach in exactly 64 steps?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-21/data.txt",
  "utf8",
  () => null
);

let starter = "";

const input = dataset.split("\n").map((chunk, i) => {
  const spl = chunk.split("");
  if (spl.indexOf("S") >= 0) starter = [i, spl.indexOf("S")].join(";");
  return spl;
});

const top = ([i, j]) => (input[i - 1] ? [i - 1, j] : null);
const bottom = ([i, j]) => (input[i + 1] ? [i + 1, j] : null);
const left = ([i, j]) => (j > 0 ? [i, j - 1] : null);
const right = ([i, j]) => (j < input[i].length ? [i, j + 1] : null);

const countTiles = () => {
  let steps = 0;
  let map = new Set();
  map.add(starter);
  while (steps < 6) {
    const stepMap = new Set();
    console.log({ steps });
    const traverse = (n) => {
      const node = n.split(";").map(Number);

      const nextSteps = [
        top(node),
        bottom(node),
        left(node),
        right(node),
      ].filter(Boolean);

      console.log(nextSteps);
      nextSteps.forEach(([i, j]) => {
        const item = input[i][j];
        if (item !== "#") stepMap.add(`${i};${j}`);
      });
    };

    map.forEach((item) => traverse(item));
    map = stepMap;
    steps++;
  }

  return map.size;
};

console.log(countTiles());
