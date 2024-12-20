/* eslint-disable no-loop-func */
/* --- Part Two ---
The staff don't really like some of the towel arrangements you came up with. To avoid an endless cycle of towel rearrangement, maybe you should just give them every possible option.

Here are all of the different ways the above example's designs can be made:

brwrr can be made in two different ways: b, r, wr, r or br, wr, r.

bggr can only be made with b, g, g, and r.

gbbr can be made 4 different ways:

g, b, b, r
g, b, br
gb, b, r
gb, br
rrbgbr can be made 6 different ways:

r, r, b, g, b, r
r, r, b, g, br
r, r, b, gb, r
r, rb, g, b, r
r, rb, g, br
r, rb, gb, r
bwurrg can only be made with bwu, r, r, and g.

brgr can be made in two different ways: b, r, g, r or br, g, r.

ubwu and bbrgwb are still impossible.

Adding up all of the ways the towels in this example could be arranged into the desired designs yields 16 (2 + 1 + 4 + 6 + 1 + 2).

They'll let you into the onsen as soon as you have the list. What do you get if you add up the number of different ways you could make each design?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-19/data.txt",
  "utf8",
  () => null
);

const [flagsData, data] = dataset.split("\n\n");

const flags = flagsData.split(", ");
const input = data.split("\n");

const findMatch = (line: string) => {
  const tracker = [1];
  for (let i = 1; i < line.length + 1; i++) {
    tracker.push(0);
  }

  let curr = 0;

  while (curr < line.length) {
    const currString = line.substring(curr, line.length);
    flags.forEach((item) => {
      if (currString.startsWith(item)) {
        const el = tracker[curr];
        tracker[item.length + curr] = el + tracker[item.length + curr];
      }
    });

    curr = tracker.findIndex((item, i) => i > curr && !!item);

    if (curr === -1) return false;
  }
  return tracker[tracker.length - 1];
};

const findPossibleCombinations = () =>
  input.reduce((acc, flag) => {
    const res = findMatch(flag);
    if (res) acc += res;
    return acc;
  }, 0);

console.log(findPossibleCombinations());
