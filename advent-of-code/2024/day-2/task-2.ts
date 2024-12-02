/* --- Part Two ---
The engineers are surprised by the low number of safe reports until they realize they forgot to tell you about the Problem Dampener.

The Problem Dampener is a reactor-mounted module that lets the reactor safety systems tolerate a single bad level in what would otherwise be a safe report. It's like the bad level never happened!

Now, the same rules apply as before, except if removing a single level from an unsafe report would make it safe, the report instead counts as safe.

More of the above example's reports are now safe:

7 6 4 2 1: Safe without removing any level.
1 2 7 8 9: Unsafe regardless of which level is removed.
9 7 6 2 1: Unsafe regardless of which level is removed.
1 3 2 4 5: Safe by removing the second level, 3.
8 6 4 4 1: Safe by removing the third level, 4.
1 3 6 7 9: Safe without removing any level.
Thanks to the Problem Dampener, 4 reports are actually safe!

Update your analysis by handling situations where the Problem Dampener can remove a single level from unsafe reports. How many reports are now safe?
*/
export {};
const fs = require("fs");

enum Direction {
  asc = "asc",
  desc = "desc",
}

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-2/data.txt",
  "utf8",
  () => null
);
const input: number[][] = dataset
  .split("\n")
  .map((line) => line.split(" ").map(Number));

const comparator = (line: number[]): boolean => {
  let currDir: Direction;

  for (let i = 0; i < line.length - 1; i++) {
    const curr = line[i];
    const next = line[i + 1];

    if (curr === next) return false;

    if (!currDir) {
      currDir = curr > next ? Direction.desc : Direction.asc;
    }
    if (currDir === Direction.asc && curr > next) return false;
    if (currDir === Direction.desc && curr < next) return false;
    if (Math.abs(curr - next) > 3) return false;
  }

  return true;
};

const findValidReports = (data: number[][]): number => {
  const filtered = data.filter((line) => {
    const allOptions = [line];

    for (let i = 0; i < line.length; i++) {
      const newLine = [...line];
      newLine.splice(i, 1);
      allOptions.push(newLine);
    }

    for (let j = 0; j < allOptions.length; j++) {
      const currLine = allOptions[j];
      if (comparator(currLine)) return true;
    }
    return false;
  });

  return filtered.length;
};

console.log(findValidReports(input));
