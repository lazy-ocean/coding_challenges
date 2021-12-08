/* eslint-disable prefer-destructuring */
/* ---- Day 8: Seven Segment Search ---
--- Part Two ---
Through a little deduction, you should now be able to determine the remaining digits. Consider again the first example above:

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf
After some careful analysis, the mapping between signal wires and segments only make sense in the following configuration:

 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc
So, the unique signal patterns would correspond to the following digits:

acedgfb: 8
cdfbe: 5
gcdfa: 2
fbcad: 3
dab: 7
cefabd: 9
cdfgeb: 6
eafb: 4
cagedb: 0
ab: 1
Then, the four digits of the output value can be decoded:

cdfeb: 5
fcadb: 3
cdfeb: 5
cdbaf: 3
Therefore, the output value for this entry is 5353.

Following this same process for each entry in the second, larger example above, the output value of each entry can be determined:

fdgacbe cefdb cefbgd gcbe: 8394
fcgedb cgb dgebacf gc: 9781
cg cg fdcagb cbg: 1197
efabcd cedba gadfec cb: 9361
gecf egdcabf bgf bfgea: 4873
gebdcfa ecba ca fadegcb: 8418
cefg dcbef fcge gbcadfe: 4548
ed bcgafe cdgba cbgef: 1625
gbdfcae bgc cg cgb: 8717
fgae cfgab fg bagce: 4315
Adding all of the output values in this larger example produces 61229.

For each entry, determine all of the wire/segment connections and decode the four-digit output values. What do you get if you add up all of the output values?
*/
import { DigitsData } from "./interfaces";

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-8/data.txt",
  "utf8",
  () => null
);

const input: string[][][] = dataset
  .split("\n")
  .map((line) => line.split(" | ").map((item) => item.split(" ")));

const numsMapping: DigitsData = {
  0: { length: 6, letters: [] },
  1: { length: 2, letters: [] }, // 2
  2: { length: 5, letters: [] },
  3: { length: 5, letters: [] },
  4: { length: 4, letters: [] }, // 4
  5: { length: 5, letters: [] },
  6: { length: 6, letters: [] },
  7: { length: 3, letters: [] }, // 3
  8: { length: 7, letters: [] }, // 7
  9: { length: 6, letters: [] },
};

const findDigitsCombinations = (data: string[][]): number => {
  const decode = (arr) => {
    const digits = {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
    };
    const posMap = {
      top: null,
      topLeft: null,
      topRight: null,
      middle: null,
      bottomLeft: null,
      bottomRight: null,
      bottom: null,
    };
    // first step - finding 1, 4, 7, 8 - length = 2
    let filteredArr = arr
      .map((comb) => {
        switch (comb.length) {
          case 2:
            digits[1] = comb;
            return "";
          case 4:
            digits[4] = comb;
            return "";
          case 3:
            digits[7] = comb;
            return "";
          case 7:
            digits[8] = comb;
            return "";
          default:
            return comb;
        }
      })
      .filter(Boolean);

    // step 2: diff between 1 and 7 = top line
    posMap.top = digits[7].find((l) => digits[1].indexOf(l) === -1);
    // step 3: 4 + top + unknown (bottom) = 9
    const nine = [...digits[4], posMap.top];
    digits[9] = filteredArr.find(
      (item) => item.length === 6 && nine.every((l) => item.includes(l))
    );
    posMap.bottom = digits[9].find((l) => nine.indexOf(l) === -1);
    filteredArr = filteredArr.filter((line) => line !== digits[9]);

    // step 4: 7 + bottom + unknown (middle) = 3
    const three = [...digits[7], posMap.bottom];
    digits[3] = filteredArr.find(
      (item) => item.length === 5 && three.every((l) => item.includes(l))
    );
    posMap.middle = digits[3].find((l) => three.indexOf(l) === -1);
    // step 4: 4 - 1 - middle = topLeft
    posMap.topLeft = digits[4].filter(
      (l) => !digits[1].includes(l) && l !== posMap.middle
    )[0];
    // step 5: 5 = top + top left + middle + [unknown bottom right] + bottom
    const five = [posMap.top, posMap.topLeft, posMap.middle, posMap.bottom];
    digits[5] = filteredArr.find(
      (item) => item.length === 5 && five.every((l) => item.includes(l))
    );
    posMap.bottomRight = digits[5].find((l) => five.indexOf(l) === -1);
    // step 6: topRight = 1 - bottomRight
    posMap.topRight = digits[1].find((i) => i !== posMap.bottomRight);
    posMap.bottomLeft = digits[8].find((l) => digits[9].indexOf(l) === -1);
    const { top, topRight, middle, bottomRight, bottom, bottomLeft, topLeft } =
      posMap;
    digits[0] = [top, topRight, bottomRight, bottom, bottomLeft, topLeft];
    digits[2] = [top, topRight, middle, bottomLeft, bottom];
    digits[6] = [top, topLeft, middle, bottomRight, bottom, bottomLeft];
    return digits;
  };

  const decodedDigits = decode(data[0].map((item) => item.split("")));
  Object.keys(decodedDigits).forEach((key) => {
    decodedDigits[key] = decodedDigits[key].sort().join("");
  });

  let code = "";
  data[1].forEach((line) => {
    code += Object.keys(decodedDigits).find(
      (digit) => decodedDigits[digit] === line.split("").sort().join("")
    );
  });
  return Number(code);
};

const findCombinations = (data: string[][][]) =>
  data.map((code) => findDigitsCombinations(code)).reduce((a, b) => a + b);

console.log(findCombinations(input));
