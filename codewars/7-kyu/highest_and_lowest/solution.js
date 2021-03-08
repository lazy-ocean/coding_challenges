/* https://www.codewars.com/kata/highest-and-lowest/
In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.

All numbers are valid Int32, no need to validate them.
There will always be at least one number in the input string.
Output string must be two numbers separated by a single space, and highest number is first.
*/
const highAndLow = (numbers) => {
  const sorted = numbers.split(" ").sort((a, b) => a - b);
  return `${sorted[sorted.length - 1]} ${sorted[0]}`;
};

console.log(highAndLow("4 5 29 54 4 0 -214 542 -64 1 -3 6 -6"));
module.exports = highAndLow;
