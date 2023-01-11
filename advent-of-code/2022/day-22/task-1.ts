/* --- Day 22: Monkey Map ---
The monkeys take you on a surprisingly easy trail through the jungle. They're even going in roughly the right direction according to your handheld device's Grove Positioning System.

As you walk, the monkeys explain that the grove is protected by a force field. To pass through the force field, you have to enter a password; doing so involves tracing a specific path on a strangely-shaped board.

At least, you're pretty sure that's what you have to do; the elephants aren't exactly fluent in monkey.

The monkeys give you notes that they took when they last saw the password entered (your puzzle input).

For example:

        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5
The first half of the monkeys' notes is a map of the board. It is comprised of a set of open tiles (on which you can move, drawn .) and solid walls (tiles which you cannot enter, drawn #).

The second half is a description of the path you must follow. It consists of alternating numbers and letters:

A number indicates the number of tiles to move in the direction you are facing. If you run into a wall, you stop moving forward and continue with the next instruction.
A letter indicates whether to turn 90 degrees clockwise (R) or counterclockwise (L). Turning happens in-place; it does not change your current tile.
So, a path like 10R5 means "go forward 10 tiles, then turn clockwise 90 degrees, then go forward 5 tiles".

You begin the path in the leftmost open tile of the top row of tiles. Initially, you are facing to the right (from the perspective of how the map is drawn).

If a movement instruction would take you off of the map, you wrap around to the other side of the board. In other words, if your next tile is off of the board, you should instead look in the direction opposite of your current facing as far as you can until you find the opposite edge of the board, then reappear there.

For example, if you are at A and facing to the right, the tile in front of you is marked B; if you are at C and facing down, the tile in front of you is marked D:

        ...#
        .#..
        #...
        ....
...#.D.....#
........#...
B.#....#...A
.....C....#.
        ...#....
        .....#..
        .#......
        ......#.
It is possible for the next tile (after wrapping around) to be a wall; this still counts as there being a wall in front of you, and so movement stops before you actually wrap to the other side of the board.

By drawing the last facing you had with an arrow on each tile you visit, the full path taken by the above example looks like this:

        >>v#    
        .#v.    
        #.v.    
        ..v.    
...#...v..v#    
>>>v...>#.>>    
..#v...#....    
...>>>>v..#.    
        ...#....
        .....#..
        .#......
        ......#.
To finish providing the password to this strange input device, you need to determine numbers for your final row, column, and facing as your final position appears from the perspective of the original map. Rows start from 1 at the top and count downward; columns start from 1 at the left and count rightward. (In the above example, row 1, column 1 refers to the empty space with no tile on it in the top-left corner.) Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^). The final password is the sum of 1000 times the row, 4 times the column, and the facing.

In the above example, the final row is 6, the final column is 8, and the final facing is 0. So, the final password is 1000 * 6 + 4 * 8 + 0: 6032.

Follow the path given in the monkeys' notes. What is the final password?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-22/data.txt",
  "utf8",
  () => null
);

const [mapI, instr] = dataset.split("\n\n");

const adjMap = mapI.split("\n").map((line) => line.split(""));

const parseInstructions = (str: string): string[] => {
  const res: string[] = [];
  let temp = "";
  let type = "number";
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    if (
      (!Number.isNaN(Number(item)) && type === "number") ||
      (Number.isNaN(Number(item)) && type === "string")
    ) {
      temp = `${temp}${item}`;
    } else {
      res.push(temp);
      temp = item;
      type = !Number.isNaN(Number(item)) ? "number" : "string";
    }
  }
  res.push(temp);
  return res;
};

enum Directions {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
}

const turningMapping = {
  R: {
    [Directions.down]: Directions.left,
    [Directions.left]: Directions.up,
    [Directions.up]: Directions.right,
    [Directions.right]: Directions.down,
  },
  L: {
    [Directions.down]: Directions.right,
    [Directions.left]: Directions.down,
    [Directions.up]: Directions.left,
    [Directions.right]: Directions.up,
  },
};

const pointsMapping = {
  [Directions.down]: 1,
  [Directions.left]: 2,
  [Directions.right]: 0,
  [Directions.up]: 3,
};

const moveHorizontally = (
  steps: number,
  row: string[],
  currPos: number,
  dir: Directions
): number => {
  let newPos = currPos;
  const st = dir === Directions.left ? -1 : 1;
  while (steps) {
    if (row?.[newPos + st] === "#") break;
    if (!row[newPos + st]) {
      if (dir === Directions.right) {
        const n = row.findIndex((i) => i.trim());
        if (row[newPos] === "#") break;
        newPos = n;
      } else {
        for (let i = row.length - 1; i >= 0; i--) {
          if (row[i]) {
            if (row[i] === "#") break;
            newPos = i;
          }
        }
      }
    } else newPos += st;
    steps--;
  }
  return newPos;
};

const moveVertically = (
  steps: number,
  map: string[][],
  currPos: { col: number; row: number },
  dir: Directions
): number => {
  let newPos = currPos.row;
  const st = dir === Directions.up ? -1 : 1;
  while (steps) {
    if (map[newPos + st]?.[currPos.col] === "#") {
      break;
    }
    if (
      !map[newPos + st] ||
      !map[newPos + st][currPos.col] ||
      !map[newPos + st][currPos.col].trim()
    ) {
      if (dir === Directions.up) {
        for (let i = map.length - 1; i >= 0; i--) {
          const item = map[i][currPos.col];
          if (item) {
            if (item === "#") break;
            newPos = i;
          }
        }
      } else {
        for (let i = 0; i <= map.length - 1; i++) {
          const item = map[i][currPos.col];
          if (item && item.trim()) {
            if (item === "#") {
              break;
            }
            newPos = i;
          }
        }
      }
    } else newPos += st;
    steps--;
  }
  return newPos;
};

const findPassword = (map, steps) => {
  const currPosition = { row: 0, col: 50 };
  let currDir = Directions.right;
  steps.forEach((step) => {
    if (!Number.isNaN(Number(step))) {
      switch (currDir) {
        case Directions.right:
        case Directions.left:
          currPosition.col = moveHorizontally(
            Number(step),
            map[currPosition.row],
            currPosition.col,
            currDir
          );
          break;
        case Directions.up:
        case Directions.down:
          currPosition.row = moveVertically(
            Number(step),
            map,
            currPosition,
            currDir
          );
          break;
        default:
          break;
      }
    } else {
      currDir = turningMapping[step][currDir];
    }
  });

  return (
    1000 * (currPosition.row + 1) +
    4 * (currPosition.col + 1) +
    pointsMapping[currDir]
  );
};

console.log(findPassword(adjMap, parseInstructions(instr)));
