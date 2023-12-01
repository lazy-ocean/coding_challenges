/* --- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-1/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n");

const numsArr = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const numsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const isNumber = (num) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !Number.isNaN(num);

const findCalibrationValue = (data: string[]) => {
  let sum = 0;

  data.forEach((line) => {
    const lineArr = line.split("");
    let num = "";

    let startWord = "";
    let startIndWord = Number.MAX_SAFE_INTEGER;

    numsArr.forEach((item) => {
      if (line.includes(item) && startIndWord > line.indexOf(item)) {
        startWord = item;
        startIndWord = line.indexOf(item);
      }
    });

    const startIndNum = lineArr.findIndex((item) => Number(item));

    if (startIndWord === -1) {
      num += lineArr.find((item) => isNumber(Number(item)));
    } else if (startIndNum === -1) {
      num += numsMap[startWord];
    } else if (startIndWord > startIndNum) {
      num += lineArr.find((item) => isNumber(Number(item)));
    } else if (startIndWord < startIndNum) {
      num += numsMap[startWord];
    }

    let endWord = "";
    let endIndWord = -1;

    numsArr.forEach((item) => {
      if (line.includes(item) && endIndWord < line.lastIndexOf(item)) {
        endWord = item;
        endIndWord = line.lastIndexOf(item);
      }
    });

    const endIndNum = line.split("").findLastIndex((item) => Number(item));

    if (endIndWord === -1) {
      num += lineArr.findLast((item) => isNumber(Number(item)));
    } else if (endIndNum === -1) {
      num += numsMap[endWord];
    } else if (endIndWord < endIndNum) {
      num += lineArr.findLast((item) => isNumber(Number(item)));
    } else if (endIndWord > endIndNum) {
      num += numsMap[endWord];
    }

    sum += Number(num);
  });

  return sum;
};

console.log(findCalibrationValue(input));
