export {};
const fs = require("fs");

const input = fs.readFileSync("dates/input.txt", "utf8", () => null);
const data: [number, number, number] = input
  .split(" ")
  .map((item: string) => Number(item));

const determineDate = (x: number, y: number, year: number) =>
  x <= 12 && y <= 12 && x !== y ? 0 : 1;

const result = determineDate(...data);
console.log(result);
/* fs.writeFileSync("metro_circle/output.txt", result.toString()) */
module.exports = determineDate;
