/* https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
*/

const rotate = (matrix) => {
  const height = matrix.length;
  const width = matrix[0].length;

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = height - 1; j >= 0; j--) {
      newRow.push(matrix[j][i]);
    }
    matrix.push(newRow);
  }
  matrix.splice(0, height);
};

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

rotate(matrix); // Output: [[7,4,1],[8,5,2],[9,6,3]]
console.log(matrix);
module.exports = rotate;
