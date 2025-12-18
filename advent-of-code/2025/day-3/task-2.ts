/* --- Part Two ---
The escalator doesn't move. The Elf explains that it probably needs more joltage to overcome the static friction of the system and hits the big red "joltage limit safety override" button. You lose count of the number of times she needs to confirm "yes, I'm sure" and decorate the lobby a bit while you wait.

Now, you need to make the largest joltage by turning on exactly twelve batteries within each bank.

The joltage output for the bank is still the number formed by the digits of the batteries you've turned on; the only difference is that now there will be 12 digits in each bank's joltage output instead of two.

Consider again the example from before:

987654321111111
811111111111119
234234234234278
818181911112111
Now, the joltages are much larger:

In 987654321111111, the largest joltage can be found by turning on everything except some 1s at the end to produce 987654321111.
In the digit sequence 811111111111119, the largest joltage can be found by turning on everything except some 1s, producing 811111111119.
In 234234234234278, the largest joltage can be found by turning on everything except a 2 battery, a 3 battery, and another 2 battery near the start to produce 434234234278.
In 818181911112111, the joltage 888911112111 is produced by turning on everything except some 1s near the front.
The total output joltage is now much larger: 987654321111 + 811111111119 + 434234234278 + 888911112111 = 3121910778619.

What is the new total output joltage?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2025/day-3/data.txt",
  "utf8",
  () => null
);
const input: string[] = dataset.split("\n");

const SEQUENCE_SIZE = 12;

let sum = 0;

const findSequence = (string: string) => {
  let charsToDrop = string.length - SEQUENCE_SIZE;
  const currentSequence = [];

  for (let i = 0; i < string.length; i++) {
    let lastNum = currentSequence.at(-1);
    const currNum = Number(string[i]);

    if (!lastNum) {
      currentSequence.push(currNum);
      continue;
    }

    while (currNum > lastNum && charsToDrop > 0) {
      currentSequence.pop();
      charsToDrop--;
      lastNum = currentSequence.at(-1);
    }

    currentSequence.push(currNum);
  }

  currentSequence.length = SEQUENCE_SIZE;

  return currentSequence;
};

const findTotalVoltage = () => {
  input.forEach((string) => {
    const num = Number(findSequence(string).join(""));

    sum += num;
  });

  return sum;
};

console.log(findTotalVoltage());
