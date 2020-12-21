const fs = require("fs");
const _ = require("lodash");

let data = fs.readFileSync("day-20/test.txt", "utf8", (err, data) => {});
let input = data
  .split("\n")
  .map((line) => line.split("\n"))
  .reduce((acc, line) => {
    let newLines = line[0].split(/ \(/);
    let allergens = newLines[1]
      .replace("contains ", "")
      .slice(0, -1)
      .split(", ");
    let dishes = newLines[0].split(" ");

    acc.push([dishes, allergens]);
    return acc;
  }, []);

const find = (input) => {
  let match = {};
  input.forEach(([dishes, allergens]) => {});
};

console.log(input);
