/* --- Day 11: Part Two ---
As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. 
Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?
 */

const fs = require("fs");

let file = fs.readFileSync("day-11/data.txt", "utf8", (err, data) => {});
let input = file
  .split("\n")
  .map((line) => line.split(""))
  .map((line) => {
    return line.map((seat) => {
      return seat === "L" ? (seat = "#") : seat;
    });
  });

const getSeat = (arr, i, j, directions) => {
  if (!arr[i] || !arr[i][j]) return false;
  let newI, newJ;
  let hotSeat = arr[i][j];
  if (hotSeat !== ".") {
    return hotSeat;
  } else {
    directions[0] === "up"
      ? (newI = i - 1)
      : directions[0] === "down"
      ? (newI = i + 1)
      : (newI = i);
    directions[1] === "left"
      ? (newJ = j - 1)
      : directions[1] === "right"
      ? (newJ = j + 1)
      : (newJ = j);
    return getSeat(arr, newI, newJ, directions);
  }
};

const findAdjacents = (arr, i, j) => {
  let adj = {
    upLeft: getSeat(arr, i - 1, j - 1, ["up", "left"]),
    up: getSeat(arr, i - 1, j, ["up", 0]),
    upRight: getSeat(arr, i - 1, j + 1, ["up", "right"]),
    left: getSeat(arr, i, j - 1, [0, "left"]),
    right: getSeat(arr, i, j + 1, [0, "right"]),
    downLeft: getSeat(arr, i + 1, j - 1, ["down", "left"]),
    down: getSeat(arr, i + 1, j, ["down", 0]),
    downRight: getSeat(arr, i + 1, j + 1, ["down", "right"]),
  };
  return Object.values(adj)
    .filter(Boolean)
    .filter((seat) => seat === "#");
};

const occupySeats = (input) => {
  let newSeatPlan = [];
  changesTrigger = false;
  for (let i = 0; i < input.length; i++) {
    let row = [];
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === ".") row.push(".");
      if (input[i][j] !== ".") {
        let adjacents = findAdjacents(input, i, j);
        if (input[i][j] === "#") {
          if (adjacents.length >= 5) {
            row.push("L");
            changesTrigger = true;
          } else {
            row.push(input[i][j]);
          }
        }
        if (input[i][j] === "L") {
          if (adjacents.length) {
            row.push(input[i][j]);
          } else {
            row.push("#");
            changesTrigger = true;
          }
        }
      }
    }
    newSeatPlan.push(row);
  }
  if (changesTrigger) {
    return occupySeats(newSeatPlan);
  } else {
    return newSeatPlan.reduce((acc, line) => {
      line.forEach((seat) => {
        if (seat === "#") acc += 1;
      });
      return acc;
    }, 0);
  }
};

console.log(occupySeats(input));
