/* --- Part Two ---
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-1/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n");

// arrays
const findMostCalories = (data: string[]) => {
  const topThree = [
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
  ];
  let temp = 0;

  for (let i = 0; i <= data.length; i++) {
    if (!data[i]) {
      if (temp > topThree[2]) {
        if (temp > topThree[0]) {
          topThree.unshift(temp);
          topThree.pop();
        } else if (temp > topThree[1]) {
          topThree.splice(1, 0, temp);
          topThree.pop();
        } else topThree[2] = temp;
      }
      temp = 0;
    } else temp += Number(data[i]);
  }
  return Object.values(topThree).reduce((a, b) => a + b, 0);
};

// objects
const findMostCalories1 = (data: string[]) => {
  let topThree = {
    1: Number.MIN_SAFE_INTEGER,
    2: Number.MIN_SAFE_INTEGER,
    3: Number.MIN_SAFE_INTEGER,
  };
  let temp = 0;

  for (let i = 0; i <= data.length; i++) {
    if (!data[i]) {
      if (temp > topThree[3]) {
        let newTopThree = { ...topThree };
        if (temp > topThree[1]) {
          newTopThree = { 1: temp, 2: topThree[1], 3: topThree[2] };
        } else if (temp > topThree[2]) {
          newTopThree = { 1: topThree[1], 2: temp, 3: topThree[2] };
        } else newTopThree = { ...newTopThree, 3: temp };
        topThree = newTopThree;
      }
      temp = 0;
    } else temp += Number(data[i]);
  }
  return Object.values(topThree).reduce((a, b) => a + b, 0);
};

console.log(findMostCalories(input));
console.log(findMostCalories1(input));
