/* --- Part Two ---
The engineers seem concerned; the total calibration result you gave them is nowhere close to being within safety tolerances. Just then, you spot your mistake: some well-hidden elephants are holding a third type of operator.

The concatenation operator (||) combines the digits from its left and right inputs into a single number. For example, 12 || 345 would become 12345. All operators are still evaluated left-to-right.

Now, apart from the three equations that could be made true using only addition and multiplication, the above example has three more equations that can be made true by inserting operators:

156: 15 6 can be made true through a single concatenation: 15 || 6 = 156.
7290: 6 8 6 15 can be made true using 6 * 8 || 6 * 15.
192: 17 8 14 can be made true using 17 || 8 + 14.
Adding up all six test values (the three that could be made before using only + and * plus the new three that can now be made by also using ||) produces the new total calibration result of 11387.

Using your new knowledge of elephant hiding spots, determine which equations could possibly be true. What is their total calibration result?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-7/data.txt",
  "utf8",
  () => null
);

const input: [number, number[]][] = dataset
  .split("\n")
  .map((line) => line.split(": "))
  .map((line) => [Number(line[0]), line[1].split(" ").map(Number)]);

const hashmap = {};

const calculate = ({ res, nums }) => {
  const key = `${nums.join("-")}?=${res}`;

  if (hashmap[key]) return hashmap[key];

  if (nums.length === 1) {
    return nums[0] === res;
  }

  const curr1 = nums[0];
  const curr2 = nums[1];

  const newnums = [...nums];
  newnums.shift();
  newnums.shift();

  const sum = curr1 + curr2;
  const mult = curr1 * curr2;
  const join = Number(`${curr1}${curr2}`);

  if (
    calculate({ res, nums: [sum, ...newnums] }) ||
    calculate({ res, nums: [mult, ...newnums] }) ||
    calculate({ res, nums: [join, ...newnums] })
  ) {
    hashmap[key] = true;
    return true;
  }
};

const findPossibleCombinations = () => {
  let success = 0;

  input.forEach((item) => {
    const [res, nums] = item;

    if (calculate({ res, nums })) {
      success += res;
    }
  });

  return success;
};

console.log(findPossibleCombinations());
