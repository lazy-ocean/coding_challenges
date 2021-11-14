/* 2.A. Count max numbers
A sequence consists of natural numbers and ends with 0. A total of no more than 10,000 numbers are entered (not counting the ending 0). Find how many elements of this sequence are equal to its largest element.
The numbers following the number 0 do not count.

Input format
A sequence of integers ending with 0.
*/

export {};
const fs = require("fs");

const input = fs.readFileSync("count_maxes/input.txt", "utf8", () => null);

const data: number[] = input
  .toString()
  .split("\n")
  .map((item: string) => Number(item));

const countMaxes = (numbers: number[]): number => {
  if (numbers[0] === 0) return 0;
  let max = numbers[0];
  let result = 1;
  for (let i = 1; numbers[i] !== 0; i++) {
    if (numbers[i] === max) {
      result += 1;
    }
    if (numbers[i] > max) {
      max = numbers[i];
      result = 1;
    }
  }
  return result;
};

const res = countMaxes(data);
console.log(res);
/* fs.writeFileSync("count_maxes/output.txt", result.toString()) */
module.exports = countMaxes;
