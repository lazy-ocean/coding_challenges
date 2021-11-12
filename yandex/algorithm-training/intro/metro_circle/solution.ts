/* B. Metro circle
Vitya works near one of the stations of the Moscow Metro Circle Line, and he lives near another station of the same line. You need to find out what is the least number of intermediate stations Vitya needs to pass on the circle line to get home from work.

Input format
The stations are numbered consecutively with natural numbers 1, 2, 3, ..., N (the 1st station is adjacent to the N-th), N does not exceed 100.

Arguments:
- N - the total number of stations on the ring line
- i and j - the numbers of the station at which Vitya gets in and the station at which he should get out. 
Numbers i and j do not coincide. All numbers are separated by a space.

Output format
Output the minimum number of intermediate stations (not counting boarding and disembarking stations) that Vitya needs to pass.
 */

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
