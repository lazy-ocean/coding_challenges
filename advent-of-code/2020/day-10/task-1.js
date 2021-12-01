const fs = require("fs");

let file = fs.readFileSync("day-10/data.txt", "utf8", (err, data) => {});
let input = file.split("\n");

const buildChain = (adapters) => {
  let oneJoltDiff = [];
  let threeJoltsDiff = ["custom"];

  const searchF = (node, adapters) => {
    let oneJolt = adapters.find((adapter) => ~~node + 1 === ~~adapter);
    if (oneJolt) {
      oneJoltDiff.push(oneJolt);
      return searchF(oneJolt, adapters);
    } else {
      let threeJolts = adapters.find((adapter) => ~~node + 3 === ~~adapter);
      if (threeJolts) {
        threeJoltsDiff.push(threeJolts);
        return searchF(threeJolts, adapters);
      } else {
        return false;
      }
    }
  };
  searchF(0, adapters);
  return oneJoltDiff.length * threeJoltsDiff.length;
};

console.log(buildChain(input));
