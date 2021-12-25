/* --- Day 25: Sea Cucumber ---
This is it: the bottom of the ocean trench, the last place the sleigh keys could be. Your submarine's experimental antenna still isn't boosted enough to detect the keys, but they must be here. All you need to do is reach the seafloor and find them.

At least, you'd touch down on the seafloor if you could; unfortunately, it's completely covered by two large herds of sea cucumbers, and there isn't an open space large enough for your submarine.

You suspect that the Elves must have done this before, because just then you discover the phone number of a deep-sea marine biologist on a handwritten note taped to the wall of the submarine's cockpit.

"Sea cucumbers? Yeah, they're probably hunting for food. But don't worry, they're predictable critters: they move in perfectly straight lines, only moving forward when there's space to do so. They're actually quite polite!"

You explain that you'd like to predict when you could land your submarine.

"Oh that's easy, they'll eventually pile up and leave enough space for-- wait, did you say submarine? And the only place with that many sea cucumbers would be at the very bottom of the Mariana--" You hang up the phone.

There are two herds of sea cucumbers sharing the same region; one always moves east (>), while the other always moves south (v). Each location can contain at most one sea cucumber; the remaining locations are empty (.). The submarine helpfully generates a map of the situation (your puzzle input). For example:

v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>
Every step, the sea cucumbers in the east-facing herd attempt to move forward one location, then the sea cucumbers in the south-facing herd attempt to move forward one location. When a herd moves forward, every sea cucumber in the herd first simultaneously considers whether there is a sea cucumber in the adjacent location it's facing (even another sea cucumber facing the same direction), and then every sea cucumber facing an empty location simultaneously moves into that location.

So, in a situation like this:

...>>>>>...
After one step, only the rightmost sea cucumber would have moved:

...>>>>.>..
After the next step, two sea cucumbers move:

...>>>.>.>.
During a single step, the east-facing herd moves first, then the south-facing herd moves. So, given this situation:

..........
.>v....v..
.......>..
..........
After a single step, of the sea cucumbers on the left, only the south-facing sea cucumber has moved (as it wasn't out of the way in time for the east-facing cucumber on the left to move), but both sea cucumbers on the right have moved (as the east-facing sea cucumber moved out of the way of the south-facing sea cucumber):

..........
.>........
..v....v>.
..........
Due to strong water currents in the area, sea cucumbers that move off the right edge of the map appear on the left edge, and sea cucumbers that move off the bottom edge of the map appear on the top edge. Sea cucumbers always check whether their destination location is empty before moving, even if that destination is on the opposite side of the map.
To find a safe place to land your submarine, the sea cucumbers need to stop moving. 
Find somewhere safe to land your submarine. What is the first step on which no sea cucumbers move?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-25/data.txt",
  "utf8",
  () => null
);

const input: string[][] = dataset.split("\n").map((line) => line.split(""));

const moveCucumbers = (data) => {
  const len = data.length;
  const l = data[0].length;
  let steps = 0;
  let moved = true;
  let currentField = data;

  const iter = (field) => {
    moved = false;
    const newField = Array(len)
      .fill(null)
      .map(() => Array(l).fill(".", 0, l));
    for (let i = 0; i < len; i++) {
      // doing only for '>'
      for (let j = 0; j < l; j++) {
        if (field[i][j] === ">") {
          if (field[i][j + 1] && field[i][j + 1] === ".") {
            newField[i][j + 1] = ">";
            moved = true;
          } else if (!field[i][j + 1] && field[i][0] === ".") {
            newField[i][0] = ">";
            moved = true;
          } else newField[i][j] = ">";
        } else if (field[i][j] === "v") newField[i][j] = "v";
      }
    }

    // then for 'v'
    for (let h = 0; h < len; h++) {
      for (let k = 0; k < l; k++) {
        if (field[h][k] === "v") {
          if (newField[h + 1]) {
            if (newField[h + 1][k] === ".") {
              newField[h][k] = ".";
              newField[h + 1][k] = "v";
              moved = true;
            } else newField[h][k] = "v";
          } else if (newField[0][k] === "." && field[0][k] !== "v") {
            newField[h][k] = ".";
            newField[0][k] = "v";
            moved = true;
          } else newField[h][k] = "v";
        }
      }
    }

    return newField;
  };

  while (moved /* steps < 2 */) {
    currentField = iter(currentField);
    steps++;
  }
  return steps;
};

console.log(moveCucumbers(input));
