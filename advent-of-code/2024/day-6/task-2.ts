/* --- Part Two ---
While The Historians begin working around the guard's patrol route, you borrow their fancy device and step outside the lab. From the safety of a supply closet, you time travel through the last few months and record the nightly status of the lab's guard post on the walls of the closet.

Returning after what seems like only a few seconds to The Historians, they explain that the guard's patrol area is simply too large for them to safely search the lab without getting caught.

Fortunately, they are pretty sure that adding a single new obstruction won't cause a time paradox. They'd like to place the new obstruction in such a way that the guard will get stuck in a loop, making the rest of the lab safe to search.

To have the lowest chance of creating a time paradox, The Historians would like to know all of the possible positions for such an obstruction. The new obstruction can't be placed at the guard's starting position - the guard is there right now and would notice.

In the above example, there are only 6 different positions where a new obstruction would cause the guard to get stuck in a loop. The diagrams of these six situations use O to mark the new obstruction, | to show a position where the guard moves up/down, - to show a position where the guard moves left/right, and + to show a position where the guard moves both up/down and left/right.

Option one, put a printing press next to the guard's starting position:

....#.....
....+---+#
....|...|.
..#.|...|.
....|..#|.
....|...|.
.#.O^---+.
........#.
#.........
......#...
Option two, put a stack of failed suit prototypes in the bottom right quadrant of the mapped area:


....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
......O.#.
#.........
......#...
Option three, put a crate of chimney-squeeze prototype fabric next to the standing desk in the bottom right quadrant:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----+O#.
#+----+...
......#...
Option four, put an alchemical retroencabulator near the bottom left corner:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
..|...|.#.
#O+---+...
......#...
Option five, put the alchemical retroencabulator a bit to the right instead:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
....|.|.#.
#..O+-+...
......#...
Option six, put a tank of sovereign glue right next to the tank of universal solvent:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----++#.
#+----++..
......#O..
It doesn't really matter what you choose to use as an obstacle so long as you and The Historians can put it into position without the guard noticing. The important thing is having enough options that you can find one that minimizes time paradoxes, and in this example, there are 6 different positions you could choose.

You need to get the guard stuck in a loop by adding a single new obstruction. How many different positions could you choose for this obstruction?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-6/data.txt",
  "utf8",
  () => null
);

let guard = null;

let currNewBlockerX = null;
let currNewBlockerY = null;

const input = dataset.split("\n").map((line, i) => {
  const split = line.split("");

  if (!guard) {
    const guardLocation = split.findIndex((item) => item === "^");
    if (guardLocation >= 0) guard = [i, guardLocation];
  }

  return split;
});

enum Direction {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
}

const DIRECTIONS_MAP = ["up", "right", "down", "left"];

const findIndex = ({ cx, cy, direction }) => {
  switch (direction) {
    case Direction.up:
      return [cx - 1, cy];
    case Direction.right:
      return [cx, cy + 1];
    case Direction.down:
      return [cx + 1, cy];
    case Direction.left:
    default:
      return [cx, cy - 1];
  }
};

const makeStep = ({ cx, cy, direction }) => {
  let dir = direction;
  const [newX, newY] = findIndex({ cx, cy, direction });
  let x = newX;
  let y = newY;

  if (!input[x] || !input[x][y]) {
    return false;
  }

  if (input[x][y] === "#" || (currNewBlockerX === x && currNewBlockerY === y)) {
    dir =
      DIRECTIONS_MAP[
        DIRECTIONS_MAP.findIndex((item) => item === direction) + 1
      ] ?? DIRECTIONS_MAP[0];

    x = cx;
    y = cy;
  }

  return { x, y, direction: dir };
};

let res = 0;

const findVisitedTiles = () => {
  const history = new Set();
  history.add(`${guard[0]};${guard[1]};${Direction.up}`);
  let cx = guard[0];
  let cy = guard[1];
  let dir = Direction.up;

  while (true) {
    const newLoc = makeStep({ cx, cy, direction: dir });

    if (newLoc) {
      const { x, y, direction } = newLoc;
      cx = x;
      cy = y;
      dir = direction;
      if (history.has(`${x};${y};${dir}`)) {
        res++;
        break;
      }

      history.add(`${x};${y};${dir}`);
      makeStep({ cx: x, cy: y, direction });
    } else break;
  }
};

const setBlocker = () => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[i][j] === ".") {
        currNewBlockerX = i;
        currNewBlockerY = j;
        findVisitedTiles();
      }
    }
  }
  return res;
};

console.log(setBlocker());
