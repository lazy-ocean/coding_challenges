/* --- Day 11: Seating System ---
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:
If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied. After a second round, the seats with four or more occupied adjacent seats become empty again. This process continues for three more rounds.
At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?
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

const getSeat = (arr, i, j) => {
  if (!arr[i] || !arr[i][j]) return false;
  return arr[i][j];
};

const findAdjacents = (arr, i, j) => {
  let adj = {
    upLeft: getSeat(arr, i - 1, j - 1),
    up: getSeat(arr, i - 1, j),
    upRight: getSeat(arr, i - 1, j + 1),
    left: getSeat(arr, i, j - 1),
    right: getSeat(arr, i, j + 1),
    downLeft: getSeat(arr, i + 1, j - 1),
    down: getSeat(arr, i + 1, j),
    downRight: getSeat(arr, i + 1, j + 1),
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
          if (adjacents.length >= 4) {
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
