/* https://www.codewars.com/kata/5546180ca783b6d2d5000062/solutions/javascript
Complete the function that returns an array of length n, starting with the given number x and the squares of the previous number. If n is negative or zero, return an empty array/list.
*/
const squares = (x, n) => {
  if (n <= 0) return [];
  let result = [x];
  while (result.length < n) {
    result = [...result, result[result.length - 1] ** 2];
  }
  return result;
};

console.log(squares(2, 5));
module.exports = squares;
