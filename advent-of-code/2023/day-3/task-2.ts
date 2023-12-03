import {
  createMatrixBottom,
  createMatrixSide,
  createMatrixTop,
} from "./task-1";

/* --- Part Two ---
The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-3/data.txt",
  "utf8",
  () => null
);
const input = dataset
  .split("\n")
  .map((line) =>
    line.split("").map((it) => (Number.isNaN(Number(it)) ? it : Number(it)))
  );

const findAdjacentNumbers = (data: (string | number)[][]) => {
  let sum = 0;

  const nums = {};
  const symbols = [];

  const createNumMap = (line: (string | number)[], lineind: number) => {
    let num = "";
    let ind = [];
    for (let i = 0; i < line.length; i++) {
      const curr = line[i];
      if (typeof curr === "number") {
        num += curr;
        ind.push(i);
      } else {
        if (curr === "*") symbols.push(`${lineind};${i}`);
        ind.forEach((item) => {
          const coord = `${lineind};${item}`;
          nums[coord] = num;
        });
        num = "";
        ind = [];
      }
    }
    if (num.length) {
      ind.forEach((item) => {
        const coord = `${lineind};${item}`;
        nums[coord] = num;
      });
    }
  };

  data.forEach((line, ind) => createNumMap(line, ind));

  symbols.forEach((symbol) => {
    const numbers = [];
    const [i, j] = symbol.split(";");

    let n = [];
    createMatrixTop(Number(i), Number(j)).forEach((coord) => {
      if (nums[coord]) n.push(nums[coord]);
    });
    if (n.length) numbers.push(...[...new Set(n)]);
    createMatrixSide(Number(i), Number(j)).forEach((coord) => {
      if (nums[coord]) numbers.push(nums[coord]);
    });
    n = [];
    createMatrixBottom(Number(i), Number(j)).forEach((coord) => {
      if (nums[coord]) n.push(nums[coord]);
    });
    if (n.length) numbers.push(...[...new Set(n)]);

    if (numbers.length === 2) {
      sum += Number(numbers[0]) * Number(numbers[1]);
    }
  });

  return sum;
};

console.log(findAdjacentNumbers(input));
