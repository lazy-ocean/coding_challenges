/* --- Part Two ---
It seems like there is still quite a bit of duplicate work planned. Instead, the Elves would like to know the number of pairs that overlap at all.

In the above example, the first two pairs (2-4,6-8 and 2-3,4-5) don't overlap, while the remaining four pairs (5-7,7-9, 2-8,3-7, 6-6,4-6, and 2-6,4-8) do overlap:

5-7,7-9 overlaps in a single section, 7.
2-8,3-7 overlaps all of the sections 3 through 7.
6-6,4-6 overlaps in a single section, 6.
2-6,4-8 overlaps in sections 4, 5, and 6.
So, in this example, the number of overlapping assignment pairs is 4.

In how many assignment pairs do the ranges overlap?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-4/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n");

const comparator = (s1: number, f1: number, s2: number, f2: number): boolean =>
  (s2 <= s1 && f1 <= f2) || (s1 < s2 && s2 <= f1);

const comparePairs = (pair: string): boolean => {
  const [first, second] = pair.split(",");
  const [start1, finish1] = first.split("-").map(Number);
  const [start2, finish2] = second.split("-").map(Number);

  return (
    comparator(start1, finish1, start2, finish2) ||
    comparator(start2, finish2, start1, finish1)
  );
};

const findOverlappingSections = (data: string[]): number =>
  data.filter((pair) => comparePairs(pair)).length;

console.log(findOverlappingSections(input));
