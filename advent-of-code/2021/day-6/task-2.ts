/* --- Day 6: Lanternfish ---
--- Part Two ---
Suppose the lanternfish live forever and have unlimited food and space. Would they take over the entire ocean?

After 256 days in the example above, there would be a total of 26984457539 lanternfish!

How many lanternfish would there be after 256 days?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-6/data.txt",
  "utf8",
  () => null
);

const input: number[] = dataset.split(",").map(Number);

// counting only ages of fishes, got this idea from reddit
const simulateFishReproduction = (data: number[]) => {
  let ages = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  data.forEach((f) => ages[f]++);
  const totalDays = 256;
  for (let i = 0; i < totalDays; i++) {
    ages[7] += ages[0];
    const ageZero = ages.shift();
    ages = [...ages, ageZero];
  }
  return ages.reduce((a, b) => a + b);
};

console.log(simulateFishReproduction(input));
