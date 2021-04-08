/*
Write a function that takes an array and some integer n and turns an array into a matrix of length n. Then count the sum of every column and return an index of the biggest sum.
*/
const matrixFunction = (arr, n) => {
  const matrix = [];
  while (arr.length) {
    matrix.push(arr.splice(0, n));
  }
  const l = matrix.length;
  let max = Number.MIN_SAFE_INTEGER;
  let index = null;

  for (let i = 0; i < n; i++) {
    let sum = 0;

    for (let j = 0; j < l; j++) {
      if (matrix[j][i]) {
        sum += matrix[j][i];
      }
    }
    if (sum > max) {
      max = sum;
      index = i;
    }
  }
  return index;
};
