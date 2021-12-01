const fs = require("fs");
const { min } = require("lodash");

let file = fs.readFileSync("day-13/data.txt", "utf8", (err, data) => {});
let input = file.split("\n")

const findNearestBus = ([timestamp, busesNums]) => {
  let buses = busesNums.split(',').filter(bus => bus !== 'x');
  let minutesTable = buses.reduce((acc, bus) => {
    let mins = (Math.ceil(~~timestamp / ~~bus) * ~~bus) - timestamp
    acc[bus] = mins >= 0 ? mins : Number.MAX_SAFE_INTEGER;
    return acc;
  }, {})
  let busID = Object.keys(minutesTable).reduce((acc, curr) => {
    acc = minutesTable[curr] < minutesTable[acc] ? curr : acc
    return acc;
  }, buses[0])
  return ~~busID * minutesTable[busID]
}

console.log(findNearestBus(input));
