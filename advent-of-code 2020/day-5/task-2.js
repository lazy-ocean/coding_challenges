/* --- Day 5: Part Two ---
Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat? */

const fs = require("fs");

const findSeatID = (data) => {
  const rowCypher = data.slice(0, 7);
  const colCypher = data.slice(-3);
  const row = binarySearch(rowCypher, 0, 127, "F", "B");
  const col = binarySearch(colCypher, 0, 7, "L", "R");
  const seatID = row * 8 + col;
  return seatID;
};

const binarySearch = (cypher, start, finish, lowerL, higherL) => {
  let result;
  for (let i = 0; i <= cypher.length; i++) {
    let middleIndex = Math.floor((start + finish) / 2);
    if (cypher[i] === lowerL) finish = middleIndex;
    if (cypher[i] === higherL) start = middleIndex + 1;
    result = middleIndex;
  }
  return result;
};

const findMySeat = (data) => {
  let allIDs = data.map((item) => findSeatID(item)).sort((a, b) => a - b);
  for (let i = 1; i < allIDs.length; i++) {
    if (allIDs[i - 1] !== allIDs[i] - 1) return allIDs[i] - 1;
  }
};

let file = fs.readFileSync("day-5/data.txt", "utf8", (err, data) => {});
let data = file.split("\n");
console.log(findMySeat(data));
