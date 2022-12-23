/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-loop-func */
/* --- Day 17: Pyroclastic Flow ---
Your handheld device has located an alternative exit from the cave for you and the elephants. The ground is rumbling almost continuously now, but the strange valves bought you some time. It's definitely getting warmer in here, though.

The tunnels eventually open into a very tall, narrow chamber. Large, oddly-shaped rocks are falling into the chamber from above, presumably due to all the rumbling. If you can't work out where the rocks will fall next, you might be crushed!

The five types of rocks have the following peculiar shapes, where # is rock and . is empty space:

####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##
The rocks fall in the order shown above: first the - shape, then the + shape, and so on. Once the end of the list is reached, the same order repeats: the - shape falls first, sixth, 11th, 16th, etc.

The rocks don't spin, but they do get pushed around by jets of hot gas coming out of the walls themselves. A quick scan reveals the effect the jets of hot gas will have on the rocks as they fall (your puzzle input).

For example, suppose this was the jet pattern in your cave:

>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
In jet patterns, < means a push to the left, while > means a push to the right. The pattern above means that the jets will push a falling rock right, then right, then right, then left, then left, then right, and so on. If the end of the list is reached, it repeats.

The tall, vertical chamber is exactly seven units wide. Each rock appears so that its left edge is two units away from the left wall and its bottom edge is three units above the highest rock in the room (or the floor, if there isn't one).

After a rock appears, it alternates between being pushed by a jet of hot gas one unit (in the direction indicated by the next symbol in the jet pattern) and then falling one unit down. If any movement would cause any part of the rock to move into the walls, floor, or a stopped rock, the movement instead does not occur. If a downward movement would have caused a falling rock to move into the floor or an already-fallen rock, the falling rock stops where it is (having landed on something) and a new rock immediately begins falling.

Drawing falling rocks with @ and stopped rocks with #, the jet pattern in the example above manifests as follows:

The first rock begins falling:
|..@@@@.|
|.......|
|.......|
|.......|
+-------+

Jet of gas pushes rock right:
|...@@@@|
|.......|
|.......|
|.......|
+-------+

Rock falls 1 unit:
|...@@@@|
|.......|
|.......|
+-------+

Jet of gas pushes rock right, but nothing happens:
|...@@@@|
|.......|
|.......|
+-------+

Rock falls 1 unit:
|...@@@@|
|.......|
+-------+

Jet of gas pushes rock right, but nothing happens:
|...@@@@|
|.......|
+-------+

Rock falls 1 unit:
|...@@@@|
+-------+

Jet of gas pushes rock left:
|..@@@@.|
+-------+

Rock falls 1 unit, causing it to come to rest:
|..####.|
+-------+

A new rock begins falling:
|...@...|
|..@@@..|
|...@...|
|.......|
|.......|
|.......|
|..####.|
+-------+

Jet of gas pushes rock left:
|..@....|
|.@@@...|
|..@....|
|.......|
|.......|
|.......|
|..####.|
+-------+

Rock falls 1 unit:
|..@....|
|.@@@...|
|..@....|
|.......|
|.......|
|..####.|
+-------+

Jet of gas pushes rock right:
|...@...|
|..@@@..|
|...@...|
|.......|
|.......|
|..####.|
+-------+

Rock falls 1 unit:
|...@...|
|..@@@..|
|...@...|
|.......|
|..####.|
+-------+

Jet of gas pushes rock left:
|..@....|
|.@@@...|
|..@....|
|.......|
|..####.|
+-------+

Rock falls 1 unit:
|..@....|
|.@@@...|
|..@....|
|..####.|
+-------+

Jet of gas pushes rock right:
|...@...|
|..@@@..|
|...@...|
|..####.|
+-------+

Rock falls 1 unit, causing it to come to rest:
|...#...|
|..###..|
|...#...|
|..####.|
+-------+

A new rock begins falling:
|....@..|
|....@..|
|..@@@..|
|.......|
|.......|
|.......|
|...#...|
|..###..|
|...#...|
|..####.|
+-------+

To prove to the elephants your simulation is accurate, they want to know how tall the tower will get after 2022 rocks have stopped (but before the 2023rd rock begins falling). In this example, the tower of rocks will be 3068 units tall.

How many units tall will the tower of rocks be after 2022 rocks have stopped falling?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-17/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("");

const rocks = (top: number, left = 2) => [
  {
    [top]: [left, left + 1, left + 2, left + 3],
  },
  {
    [top]: [left + 1],
    [top + 1]: [left, left + 1, left + 2],
    [top + 2]: [left + 1],
  },
  {
    [top]: [left, left + 1, left + 2],
    [top + 1]: [left + 2],
    [top + 2]: [left + 2],
  },
  {
    [top]: [left],
    [top + 1]: [left],
    [top + 2]: [left],
    [top + 3]: [left],
  },
  {
    [top]: [left, left + 1],
    [top + 1]: [left, left + 1],
  },
];

const width = 6;
const fallHeight = 4;
const stepsLimit = 2022;

const buildATower = (currents: string[]) => {
  let currCurrent = 0;
  let currRock = 0;
  const occupied = { 0: new Set([0, 1, 2, 3, 4, 5, 6, 7]) };
  let occupiedTop = 0;
  let rocksFell = 0;

  while (rocksFell < stepsLimit) {
    let rock = { ...rocks(occupiedTop + fallHeight)[currRock] };
    if (rocksFell === 21) console.log(rock);
    let availableSpace = true;

    while (availableSpace) {
      // currents
      const curr = currents[currCurrent];
      currCurrent = currCurrent + 1 === currents.length ? 0 : currCurrent + 1;

      const moveSideways = () => {
        const newRock = { ...rock };

        for (const coord in rock) {
          const t = newRock[coord].map((c) => {
            if (curr === ">" && !Object.values(rock).flat().includes(width)) {
              return c + 1;
            }
            if (curr === "<" && !Object.values(rock).flat().includes(0)) {
              return c - 1;
            }
            return c;
          });

          if (t.some((item) => occupied[coord]?.has(item))) return rock;

          newRock[coord] = t;
        }
        return newRock;
      };

      rock = moveSideways();

      const checkIfSpaceLeft = (): boolean => {
        for (const key in rock) {
          const occupiedSectors = Array.from(occupied[Number(key) - 1] || []);
          if (rock[key].some((cell) => occupiedSectors.includes(cell)))
            return false;
        }
        return true;
      };

      const spaceLeft = checkIfSpaceLeft();

      if (spaceLeft) {
        Object.keys(rock).forEach((key) => {
          rock[Number(key) - 1] = [...rock[key]];
          delete rock[key];
        });
      }
      availableSpace = spaceLeft;
    }

    Object.keys(rock).forEach((key) => {
      occupied[key] = new Set([...rock[key], ...(occupied?.[key] || [])]);
      if (Number(key) > occupiedTop) occupiedTop = Number(key);
    });
    rocksFell++;
    currRock < 4 ? currRock++ : (currRock = 0);
  }
  return Object.keys(occupied)
    .map(Number)
    .sort((a, b) => a - b)
    .pop();
};

console.log(buildATower(input));
