/* eslint-disable no-restricted-syntax */
/* 542. 01 Matrix
https://leetcode.com/problems/01-matrix/
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]

Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
*/

const updateMatrix = (nums: number[][]): number[][] => {
  const res = new Array(nums.length);
  const zeros = [];

  for (let i = 0; i < nums.length; i++) {
    res[i] = new Array(nums[i].length);
    for (let j = 0; j < nums[0].length; j++) {
      if (nums[i][j] === 0) {
        res[i][j] = 0;
        zeros.push({ x: i, y: j, steps: 0 });
      } else res[i][j] = -1;
    }
  }

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (zeros.length) {
    const { x, y, steps } = zeros.shift();

    dirs.forEach(([dirX, dirY]) => {
      const currX = x + dirX;
      const currY = y + dirY;

      if (res[currX] && res[currX][currY] && res[currX][currY] === -1) {
        res[currX][currY] = steps + 1;
        zeros.push({ x: currX, y: currY, steps: steps + 1 });
      }
    });
  }

  return res;
};

console.log(
  updateMatrix([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ])
);
module.exports = updateMatrix;
