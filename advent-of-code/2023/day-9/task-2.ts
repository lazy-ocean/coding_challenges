/* --- Part Two ---
Of course, it would be nice to have even more history included in your report. Surely it's safe to just extrapolate backwards as well, right?

For each history, repeat the process of finding differences until the sequence of differences is entirely zero. Then, rather than adding a zero to the end and filling in the next values of each previous sequence, you should instead add a zero to the beginning of your sequence of zeroes, then fill in new first values for each previous sequence.

In particular, here is what the third example history looks like when extrapolating back in time:

5  10  13  16  21  30  45
  5   3   3   5   9  15
   -2   0   2   4   6
      2   2   2   2
        0   0   0
Adding the new values on the left side of each sequence from bottom to top eventually reveals the new left-most history value: 5.

Doing this for the remaining example data above results in previous values of -3 for the first history and 0 for the second history. Adding all three new values together produces 2.

Analyze your OASIS report again, this time extrapolating the previous value for each history. What is the sum of these extrapolated values?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-9/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n").map((line) => line.split(" ").map(Number));

const f = (sequence: number[]): number => {
  let s = sequence;
  let run = true;
  const stack = [s[0]];
  while (run) {
    const currentSequence = [];

    for (let i = 0; i < s.length - 1; i++) {
      const a = s[i];
      const b = s[i + 1];
      const diff = b - a;
      currentSequence.push(diff);
      if (i === 0) stack.push(diff);
    }

    if (
      [...new Set(currentSequence)].length === 1 &&
      currentSequence.includes(0)
    )
      run = false;
    s = currentSequence;
  }

  while (stack.length > 1) {
    const a = stack.pop();
    const b = stack.pop();
    stack.push(b - a);
  }
  return stack[0];
};

const countNextSequenceNums = (): number => {
  let res = 0;

  input.forEach((line) => {
    res += f(line);
  });
  return res;
};

console.log(countNextSequenceNums());
