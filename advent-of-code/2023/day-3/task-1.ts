/* --- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

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
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
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

export const createMatrixTop = (x: number, y: number): string[] => {
  const aboveLine = [`${x - 1};${y - 1}`, `${x - 1};${y}`, `${x - 1};${y + 1}`];
  return aboveLine;
};

export const createMatrixSide = (x: number, y: number): string[] => {
  const sameLine = [`${x};${y - 1}`, `${x};${y + 1}`];
  return sameLine;
};
export const createMatrixBottom = (x: number, y: number): string[] => {
  const belowLine = [`${x + 1};${y - 1}`, `${x + 1};${y}`, `${x + 1};${y + 1}`];
  return belowLine;
};

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
        if (curr !== ".") symbols.push(`${lineind};${i}`);
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

    numbers.forEach((numm) => {
      sum += Number(numm);
    });
  });

  return sum;
};

console.log(findAdjacentNumbers(input));
