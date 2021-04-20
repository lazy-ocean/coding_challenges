/* https://www.codewars.com/kata/541c8630095125aba6000c00/train/javascript
Digital root is the recursive sum of all the digits in a number.

Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.
*/

const digitalRoot = (num) => {
  const n = Array.from(String(num), Number);
  if (n.length === 1) return num;
  return digitalRoot(n.reduce((a, b) => a + b));
};

console.log(digitalRoot(942));
module.exports = digitalRoot;
