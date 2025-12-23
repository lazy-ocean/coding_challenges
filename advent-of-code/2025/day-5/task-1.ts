/* eslint-disable no-loop-func */
/* --- Day 5: Cafeteria ---
As the forklifts break through the wall, the Elves are delighted to discover that there was a cafeteria on the other side after all.

You can hear a commotion coming from the kitchen. "At this rate, we won't have any time left to put the wreaths up in the dining hall!" Resolute in your quest, you investigate.

"If only we hadn't switched to the new inventory management system right before Christmas!" another Elf exclaims. You ask what's going on.

The Elves in the kitchen explain the situation: because of their complicated new inventory management system, they can't figure out which of their ingredients are fresh and which are spoiled. When you ask how it works, they give you a copy of their database (your puzzle input).

The database operates on ingredient IDs. It consists of a list of fresh ingredient ID ranges, a blank line, and a list of available ingredient IDs. For example:

3-5
10-14
16-20
12-18

1
5
8
11
17
32
The fresh ID ranges are inclusive: the range 3-5 means that ingredient IDs 3, 4, and 5 are all fresh. The ranges can also overlap; an ingredient ID is fresh if it is in any range.

The Elves are trying to determine which of the available ingredient IDs are fresh. In this example, this is done as follows:

Ingredient ID 1 is spoiled because it does not fall into any range.
Ingredient ID 5 is fresh because it falls into range 3-5.
Ingredient ID 8 is spoiled.
Ingredient ID 11 is fresh because it falls into range 10-14.
Ingredient ID 17 is fresh because it falls into range 16-20 as well as range 12-18.
Ingredient ID 32 is spoiled.
So, in this example, 3 of the available ingredient IDs are fresh.

Process the database file from the new inventory management system. How many of the available ingredient IDs are fresh?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2025/day-5/test.txt",
  "utf8",
  () => null
);
const [rangesData, productsData] = dataset.split("\n\n");

const ranges = rangesData
  .split("\n")
  .map((range) => range.split("-").map(Number));
const products = productsData.split("\n").map(Number);

let fresh = 0;

const combineRanges = () => {
  let newRanges = [...ranges];

  for (let i = 0; i < newRanges.length; i++) {
    const [startData, finishData] = newRanges[i];

    for (let j = i + 1; j < newRanges.length; j++) {
      const [startCompData, finishCompData] = newRanges[j];

      let start = startData;
      let finish = finishData;
      let startComp = startCompData;
      let finishComp = finishCompData;

      if (start > startComp) {
        start = startCompData;
        finish = finishCompData;
        startComp = startData;
        finishComp = finishData;
      }

      const startsBefore = start < startComp;
      const startsWithin = start >= startComp && start < finishComp;
      const endsWithin = finish >= startComp && finish <= finishComp;
      const endsAfter = finish > finishComp;

      if (startsWithin && endsWithin) {
        if (startData === start) {
          newRanges.splice(i, 1);
          i--;
        } else {
          newRanges.splice(j, 1);
        }
        break;
      }

      if (startsBefore && endsWithin) {
        const newRange = [start, finishComp];
        const filtered = newRanges.filter((_, idx) => ![i, j].includes(idx));
        newRanges = [...filtered];
        newRanges.push(newRange);
        i--;
        break;
      }

      if (startsWithin && endsAfter) {
        const newRange = [startComp, finish];
        const filtered = newRanges.filter((_, idx) => ![i, j].includes(idx));
        newRanges = [...filtered];
        newRanges.push(newRange);
        i--;
        break;
      }
    }
  }
  return newRanges;
};

const findFreshProducts = () => {
  const rangesNew = combineRanges();

  products.forEach((product) => {
    if (
      rangesNew.some((range) => {
        const [st, fin] = range;
        if (product >= st && product <= fin) return true;
        return false;
      })
    ) {
      fresh++;
    }
  });

  return { fresh };
};

console.log(findFreshProducts());
