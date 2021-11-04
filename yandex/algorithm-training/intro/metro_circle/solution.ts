export {};
const fs = require("fs");

const input = fs.readFileSync("metro_circle/input.txt", "utf8", () => null);
const data: [number, number, number] = input
  .split(" ")
  .map((item: string) => Number(item));

const countStations = (
  stations: number,
  start: number,
  finish: number
): number => {
  if (Math.abs(start - finish) === 1) return 0;
  let newStart = start;
  let newFinish = finish;
  if (start > finish) {
    newStart = finish;
    newFinish = start;
  }

  return Math.min(
    stations - newFinish + newStart - 1,
    newFinish - newStart - 1
  );
};

const result = countStations(...data);
console.log(result);
/* fs.writeFileSync("metro_circle/output.txt", result.toString()) */
module.exports = countStations;
