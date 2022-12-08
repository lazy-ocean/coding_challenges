/* eslint-disable no-continue */
/* --- Part Two ---
Content with the amount of tree cover available, the Elves just need to know the best spot to build their tree house: they would like to be able to see a lot of trees.

To measure the viewing distance from a given tree, look up, down, left, and right from that tree; stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration. (If a tree is right on the edge, at least one of its viewing distances will be zero.)

The Elves don't care about distant trees taller than those found by the rules above; the proposed tree house has large eaves to keep it dry, so they wouldn't be able to see higher than the tree house anyway.

In the example above, consider the middle 5 in the second row:

30373
25512
65332
33549
35390
Looking up, its view is not blocked; it can see 1 tree (of height 3).
Looking left, its view is blocked immediately; it can see only 1 tree (of height 5, right next to it).
Looking right, its view is not blocked; it can see 2 trees.
Looking down, its view is blocked eventually; it can see 2 trees (one of height 3, then the tree of height 5 that blocks its view).
A tree's scenic score is found by multiplying together its viewing distance in each of the four directions. For this tree, this is 4 (found by multiplying 1 * 1 * 2 * 2).

However, you can do even better: consider the tree of height 5 in the middle of the fourth row:

30373
25512
65332
33549
35390
Looking up, its view is blocked at 2 trees (by another tree with a height of 5).
Looking left, its view is not blocked; it can see 2 trees.
Looking down, its view is also not blocked; it can see 1 tree.
Looking right, its view is blocked at 2 trees (by a massive tree of height 9).
This tree's scenic score is 8 (2 * 2 * 1 * 2); this is the ideal spot for the tree house.

Consider each tree on your map. What is the highest scenic score possible for any tree?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-8/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n").map((str) => str.split("").map(Number));

const isVisibleToLeft = (row: number[], itemI: number): number => {
  let isVisible = 0;
  for (let k = itemI - 1; k >= 0; k--) {
    if (row[k] >= 0) {
      if (row[k] < row[itemI]) {
        isVisible++;
      } else {
        isVisible++;
        break;
      }
    }
  }
  return isVisible;
};

const isVisibleToRight = (row: number[], itemI: number): number => {
  let isVisible = 0;
  for (let k = itemI + 1; k <= row.length; k++) {
    if (row[k] >= 0) {
      if (row[k] < row[itemI]) {
        isVisible++;
      } else {
        isVisible++;
        break;
      }
    }
  }
  return isVisible;
};

const countVisibleTrees = (data: number[][]): number => {
  const rowsCount = data[0].length;
  const colsCount = data.length;
  let maxScore = Number.MIN_SAFE_INTEGER;

  const getRow = (i: number): number[] => data[i];
  const getColumn = (i: number): number[] => {
    const c = [];
    for (let j = 0; j < rowsCount; j++) {
      c.push(data[j][i]);
    }
    return c;
  };

  for (let i = 0; i < colsCount; i++) {
    for (let j = 0; j < rowsCount; j++) {
      let visible = 1;
      const row = getRow(i);
      visible *= isVisibleToLeft(row, j);
      visible *= isVisibleToRight(row, j);
      const column = getColumn(j);
      visible *= isVisibleToLeft(column, i);
      visible *= isVisibleToRight(column, i);
      if (visible > maxScore) maxScore = visible;
    }
  }
  return maxScore;
};

console.log(countVisibleTrees(input));
