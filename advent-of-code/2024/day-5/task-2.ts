/* --- Part Two ---
While the Elves get to work printing the correctly-ordered updates, you have a little time to fix the rest of them.

For each of the incorrectly-ordered updates, use the page ordering rules to put the page numbers in the right order. For the above example, here are the three incorrectly-ordered updates and their correct orderings:

75,97,47,61,53 becomes 97,75,47,61,53.
61,13,29 becomes 61,29,13.
97,13,75,29,47 becomes 97,75,47,29,13.
After taking only the incorrectly-ordered updates and ordering them correctly, their middle page numbers are 47, 29, and 47. Adding these together produces 123.

Find the updates which are not in the correct order. What do you get if you add up the middle page numbers after correctly ordering just those updates?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-5/data.txt",
  "utf8",
  () => null
);

const [rulesData, sequencesData]: string[][] = dataset
  .split("\n\n")
  .map((line) => line.split("\n"));

const rules = rulesData.reduce((acc, item) => {
  const [first, second] = item.split("|");

  if (acc[first]) {
    acc[first].before.push(second);
  } else {
    acc[first] = { after: [], before: [second] };
  }

  if (acc[second]) {
    acc[second].after.push(first);
  } else {
    acc[second] = { after: [first], before: [] };
  }
  return acc;
}, {});

const sequences = sequencesData.map((item) => item.split(","));

const findFaultySequences = () => {
  const faulty = [];
  let cont = true;

  for (let i = 0; i < sequences.length; i++) {
    const currLine = sequences[i];

    while (cont) {
      for (let j = 0; j < sequences[i].length; j++) {
        const curr = sequences[i][j];

        for (let k = j + 1; k < sequences[i].length; k++) {
          const next = currLine[k];

          if (rules[curr]) {
            if (rules[curr].after.includes(next)) {
              cont = false;
              faulty.push(currLine);
              break;
            }
          }
        }

        if (!cont) break;
      }

      if (cont) {
        cont = false;
      }
    }
    cont = true;
  }
  return faulty;
};

const fixSequences = () => {
  let res = 0;
  const incorrects = findFaultySequences();

  incorrects.forEach((faultyLine) => {
    const line = [...faultyLine];
    for (let i = line.length; i >= 0; i--) {
      const curr = line[i];
      const rule = rules[curr]?.before;
      if (rule) {
        const control = line.slice(0, i);
        const ind = control.findIndex((item) => rule.includes(item));
        if (ind > -1) {
          line.splice(i, 1);
          line.splice(ind, 0, curr);

          i++;
        }
      }
    }
    const ind = Math.floor(line.length / 2);
    res += Number(line[ind]);
  });

  return res;
};

console.log(fixSequences());
