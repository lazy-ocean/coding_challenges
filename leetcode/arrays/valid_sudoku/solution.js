/*
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
*/

/* eslint no-restricted-syntax:["error", "ForInStatement"] */

const containsDuplicate = (row) => {
  const nums = row.filter((item) => item !== ".");
  const sorted = nums.sort();
  const { length } = sorted;
  for (let i = 0; i < length; i++) {
    if (sorted[i] === sorted[i + 1]) return true;
  }
  return false;
};

const quadrants = {
  1: {
    rw: 0,
    cl: 0,
  },
  2: {
    rw: 0,
    cl: 3,
  },
  3: {
    rw: 0,
    cl: 6,
  },
  4: {
    rw: 3,
    cl: 0,
  },
  5: {
    rw: 3,
    cl: 3,
  },
  6: {
    rw: 3,
    cl: 6,
  },
  7: {
    rw: 6,
    cl: 0,
  },
  8: {
    rw: 6,
    cl: 3,
  },
  9: {
    rw: 6,
    cl: 6,
  },
};

const isValidSudoku = (board) => {
  // horizontal lines validation
  for (const line of board) {
    if (containsDuplicate(line)) return false;
  }
  // vertical lines validation
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push(board[j][i]);
    }
    if (containsDuplicate(row)) return false;
  }
  // sectors validation
  let quadrant = 1;
  while (quadrant < 10) {
    let row = [];
    let { rw, cl } = quadrants[quadrant];
    const max = rw + 2;
    for (rw; rw <= max; rw++) {
      row = [...row, ...board[rw].slice(cl, cl + 3)];
    }
    if (containsDuplicate(row)) return false;
    quadrant += 1;
  }
  return true;
};

console.log(
  isValidSudoku([
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", ".", ".", ".", ".", ".", "6", "."],
    [".", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ])
);
module.exports = isValidSudoku;
