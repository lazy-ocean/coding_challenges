/* --- Day 12: Part Two ---
Before you can give the destination to the captain, you realize that the actual action meanings were printed on the back of the instructions the whole time.

Almost all of the actions indicate how to move a waypoint which is relative to the ship's position:

Action N means to move the waypoint north by the given value.
Action S means to move the waypoint south by the given value.
Action E means to move the waypoint east by the given value.
Action W means to move the waypoint west by the given value.
Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
Action F means to move forward to the waypoint a number of times equal to the given value.
The waypoint starts 10 units east and 1 unit north relative to the ship. The waypoint is relative to the ship; that is, if the ship moves, the waypoint moves with it.

For example, using the same instructions as above:

F10 moves the ship to the waypoint 10 times (a total of 100 units east and 10 units north), leaving the ship at east 100, north 10. The waypoint stays 10 units east and 1 unit north of the ship.
N3 moves the waypoint 3 units north to 10 units east and 4 units north of the ship. The ship remains at east 100, north 10.
F7 moves the ship to the waypoint 7 times (a total of 70 units east and 28 units north), leaving the ship at east 170, north 38. The waypoint stays 10 units east and 4 units north of the ship.
R90 rotates the waypoint around the ship clockwise 90 degrees, moving it to 4 units east and 10 units south of the ship. The ship remains at east 170, north 38.
F11 moves the ship to the waypoint 11 times (a total of 44 units east and 110 units south), leaving the ship at east 214, south 72. The waypoint stays 4 units east and 10 units south of the ship.
After these operations, the ship's Manhattan distance from its starting position is 214 + 72 = 286.

Figure out where the navigation instructions actually lead. What is the Manhattan distance between that location and the ship's starting position?
*/

const _ = require('lodash');
const fs = require("fs");

let file = fs.readFileSync("day-12/data.txt", "utf8", (err, data) => {});
let input = file.split("\n").map((direction) => {
  let dir = direction.slice(0, 1);
  let num = ~~direction.slice(1);
  return { dir, num };
});

let list = {
  R: {
    N: ["N", "E", "S", "W"],
    S: ["S", "W", "N", "E"],
    W: ["W", "N", "E", "S"],
    E: ["E", "S", "W", "N"],
  },
  L: {
    N: ["N", "W", "S", "E"],
    S: ["S", "E", "N", "W"],
    W: ["W", "S", "E", "N"],
    E: ["E", "N", "W", "S"],
  },
};

const findDirections = (input) => {
  let currPosition = {
    N: 0,
    S: 0,
    E: 0,
    W: 0,
  };
  let waypointPosition = {
    N: 1,
    S: 0,
    E: 10,
    W: 0,
  };
  let keys = Object.keys(currPosition);

  input.forEach((direction) => {
    if (keys.includes(direction.dir)) {
      waypointPosition[direction.dir] += direction.num;
    } else if (direction.dir === "F") {
      keys.forEach(key => {
        currPosition[key] += (waypointPosition[key] * direction.num) 
      });
    } else {
      let turns = direction.num / 90;
      let newWaypointPosition = {
        N:0,
        S:0,
        E:0,
        W:0,
      }
      keys.forEach(key => {
        let newList = list[direction.dir][key]
        let newKey = newList[turns]
        newWaypointPosition[newKey] = waypointPosition[key]
      })
      waypointPosition = _.cloneDeep(newWaypointPosition);
    }
  });
  let manhDist =
    Math.abs(currPosition.N - currPosition.S) +
    Math.abs(currPosition.W - currPosition.E);
  return manhDist;
};
console.log(findDirections(input));
