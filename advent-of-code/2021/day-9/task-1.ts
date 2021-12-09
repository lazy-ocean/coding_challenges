/* eslint-disable no-continue */
/* --- Day 9: Smoke Basin ---
These caves seem to be lava tubes. Parts are even still volcanically active; small hydrothermal vents release smoke into the caves that slowly settles like rain.

If you can model how the smoke flows through the caves, you might be able to avoid it and be that much safer. The submarine generates a heightmap of the floor of the nearby caves for you (your puzzle input).

Smoke flows to the lowest point of the area it's in. For example, consider the following heightmap:

2199943210
3987894921
9856789892
8767896789
9899965678
Each number corresponds to the height of a particular location, where 9 is the highest and 0 is the lowest a location can be.

Your first goal is to find the low points - the locations that are lower than any of its adjacent locations. Most locations have four adjacent locations (up, down, left, and right); locations on the edge or corner of the map have three or two adjacent locations, respectively. (Diagonal locations do not count as adjacent.)

In the above example, there are four low points, all highlighted: two are in the first row (a 1 and a 0), one is in the third row (a 5), and one is in the bottom row (also a 5). All other locations on the heightmap have some lower adjacent location, and so are not low points.

The risk level of a low point is 1 plus its height. In the above example, the risk levels of the low points are 2, 1, 6, and 6. The sum of the risk levels of all low points in the heightmap is therefore 15.

Find all of the low points on your heightmap. What is the sum of the risk levels of all low points on your heightmap?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-9/data.txt",
  "utf8",
  () => null
);

const input: number[][] = dataset
  .split("\n")
  .map((line) => line.split("").map((item) => Number(item)));

const findRiskLevel = (data: number[][]): number => {
  const lowestPoints = [];
  const rows = data.length;
  const columns = data[0].length;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (data[row][column] === 9) continue;
      const min = data[row][column];
      if (data[row][column - 1] >= 0 && data[row][column - 1] <= min) continue;
      if (data[row][column + 1] >= 0 && data[row][column + 1] <= min) continue;
      if (data[row - 1] && data[row - 1][column] <= min) continue;
      if (data[row + 1] && data[row + 1][column] <= min) continue;
      lowestPoints.push(min);
    }
  }
  return lowestPoints.map((i) => i + 1).reduce((a, b) => a + b);
};

console.log(findRiskLevel(input));
