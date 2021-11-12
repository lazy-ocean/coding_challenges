/* C. Dates
The two most common date formats are European (day/month/year) and American (month/day/year). The sysadmin has changed the date on one of the backups and now wants the date back. But he hasn't checked what format the date is used in the system. Can he do this without the information about a format?
You are given a string with some correct date. You need to find out if the date could be unequivocally determined only by that entry, without any format info.

Input format
The first line of the input contains three integers:
- x: 1 <= x <= 31
- y: 1 <= y <= 31
- z: 1970 <= z <= 2069.
It is guaranteed that in at least one format the entry is the correct date.
Output format
Output 1 if the date is unambiguous and 0 otherwise.
*/

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
