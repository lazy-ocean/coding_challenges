/* --- Part Two ---
Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.

The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:

seeds: 79 14 55 13
This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.

Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-5/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n\n").map((line) => line.split(":\n"));

const parseData = () => {
  const [seedsData, ...rest] = input;
  const seedsRanges = seedsData[0].split(": ")[1].split(" ").map(Number);
  const seeds = seedsRanges.reduce(
    (result, item) => {
      if (result[result.length - 1].length < 2) {
        result[result.length - 1].push(item);
      } else {
        result.push([item]);
      }
      return result;
    },
    [[]]
  );
  const info = rest.map((map) => {
    const mappings = map[1].split("\n");
    return mappings.map((item) => {
      const [dest, source, step] = item.split(" ");
      const maxSource = Number(source) + Number(step);
      return {
        dest: Number(dest),
        source: Number(source),
        step: Number(step),
        maxSource,
        diff: Number(dest) - Number(source),
      };
    });
  });
  return { seeds, info };
};

const findWinningNumsSum = () => {
  console.time("Time this");
  let lowestLocation = Number.MAX_SAFE_INTEGER;
  const { seeds, info } = parseData();
  seeds.forEach((seedRange) => {
    const [start, end] = seedRange;
    for (let j = start; j < start + end; j++) {
      let currSource = j;

      info.forEach((rule) => {
        for (let i = 0; i < rule.length; i++) {
          const { diff, source, maxSource } = rule[i];
          if (currSource >= source && currSource <= maxSource) {
            currSource += diff;
            break;
          }
        }
      });

      if (currSource < lowestLocation) lowestLocation = currSource;
    }
  });
  console.timeEnd("Time this");
  return lowestLocation;
};

console.log(findWinningNumsSum());
