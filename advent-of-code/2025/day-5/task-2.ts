/* eslint-disable no-loop-func */
/* --- Part Two ---
The Elves start bringing their spoiled inventory to the trash chute at the back of the kitchen.

So that they can stop bugging you when they get new inventory, the Elves would like to know all of the IDs that the fresh ingredient ID ranges consider to be fresh. An ingredient ID is still considered fresh if it is in any range.

Now, the second section of the database (the available ingredient IDs) is irrelevant. Here are the fresh ingredient ID ranges from the above example:

3-5
10-14
16-20
12-18
The ingredient IDs that these ranges consider to be fresh are 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, and 20. So, in this example, the fresh ingredient ID ranges consider a total of 14 ingredient IDs to be fresh.

Process the database file again. How many ingredient IDs are considered to be fresh according to the fresh ingredient ID ranges?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2025/day-5/data.txt",
  "utf8",
  () => null
);
const rangesData = dataset.split("\n\n")[0];

const ranges = rangesData
  .split("\n")
  .map((range) => range.split("-").map(Number));

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
      const startsWithin = start >= startComp && start <= finishComp;
      const endsWithin = finish >= startComp && finish <= finishComp;
      const endsAfter = finish > finishComp;

      if (startsWithin && endsWithin) {
        if (startData === start) {
          newRanges.splice(i, 1);
          i--;
          break;
        } else {
          newRanges.splice(j, 1);
          continue;
        }
      }

      if (startsBefore && endsAfter) {
        if (startData === start) {
          newRanges.splice(j, 1);
          break;
        } else {
          newRanges.splice(i, 1);
          i--;
          continue;
        }
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

  rangesNew.forEach((range) => {
    const [st, fin] = range;
    if (st === fin) {
      fresh++;
    } else fresh += fin - st + 1;
  });

  return { fresh };
};

console.log(findFreshProducts());
