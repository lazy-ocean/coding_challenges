/* --- Day 16: The Floor Will Be Lava ---
With the beam of light completely focused somewhere, the reindeer leads you deeper still into the Lava Production Facility. At some point, you realize that the steel facility walls have been replaced with cave, and the doorways are just cave, and the floor is cave, and you're pretty sure this is actually just a giant cave.

Finally, as you approach what must be the heart of the mountain, you see a bright light in a cavern up ahead. There, you discover that the beam of light you so carefully focused is emerging from the cavern wall closest to the facility and pouring all of its energy into a contraption on the opposite side.

Upon closer inspection, the contraption appears to be a flat, two-dimensional square grid containing empty space (.), mirrors (/ and \), and splitters (| and -).

The contraption is aligned so that most of the beam bounces around the grid, but each tile on the grid converts some of the beam's light into heat to melt the rock in the cavern.

You note the layout of the contraption (your puzzle input). For example:

.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....
The beam enters in the top-left corner from the left and heading to the right. Then, its behavior depends on what it encounters as it moves:

If the beam encounters empty space (.), it continues in the same direction.
If the beam encounters a mirror (/ or \), the beam is reflected 90 degrees depending on the angle of the mirror. For instance, a rightward-moving beam that encounters a / mirror would continue upward in the mirror's column, while a rightward-moving beam that encounters a \ mirror would continue downward from the mirror's column.
If the beam encounters the pointy end of a splitter (| or -), the beam passes through the splitter as if the splitter were empty space. For instance, a rightward-moving beam that encounters a - splitter would continue in the same direction.
If the beam encounters the flat side of a splitter (| or -), the beam is split into two beams going in each of the two directions the splitter's pointy ends are pointing. For instance, a rightward-moving beam that encounters a | splitter would split into two beams: one that continues upward from the splitter's column and one that continues downward from the splitter's column.
Beams do not interact with other beams; a tile can have many beams passing through it at the same time. A tile is energized if that tile has at least one beam pass through it, reflect in it, or split in it.

In the above example, here is how the beam of light bounces around the contraption:

>|<<<\....
|v-.\^....
.v...|->>>
.v...v^.|.
.v...v^...
.v...v^..\
.v../2\\..
<->-/vv|..
.|<<<2-|.\
.v//.|.v..
Beams are only shown on empty tiles; arrows indicate the direction of the beams. If a tile contains beams moving in multiple directions, the number of distinct directions is shown instead. Here is the same diagram but instead only showing whether a tile is energized (#) or not (.):

######....
.#...#....
.#...#####
.#...##...
.#...##...
.#...##...
.#..####..
########..
.#######..
.#...#.#..
Ultimately, in this example, 46 tiles become energized.

The light isn't energizing enough tiles to produce lava; to debug the contraption, you need to start by analyzing the current situation. With the beam starting in the top-left heading right, how many tiles end up being energized?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-16/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n").map((line) => line.split(""));

enum Tiles {
  dot = ".",
  pipeVer = "|",
  pipeHor = "-",
  mirrorLeft = "/",
  mirrorRight = "\\",
}

enum Direction {
  left = "left",
  right = "right",
  up = "up",
  down = "down",
}

const countTiles = (): number => {
  const activated = new Set();

  const f = (i: number, j: number, visited: string[], dir: Direction) => {
    visited.push(`${i};${j};${dir}`);
    activated.add(`${i};${j}`);

    const nextStep = { iNext: i, jNext: j };
    switch (dir) {
      case Direction.down:
        nextStep.iNext = i + 1;
        break;
      case Direction.up:
        nextStep.iNext = i - 1;
        break;
      case Direction.left:
        nextStep.jNext = j - 1;
        break;
      case Direction.right:
        nextStep.jNext = j + 1;
        break;
      default:
        break;
    }

    const { iNext, jNext } = nextStep;
    const nextItem = input[iNext]?.[jNext];
    if (!nextItem || visited.includes(`${iNext};${jNext};${dir}`)) return;

    if (nextItem === Tiles.pipeVer) {
      if (dir === Direction.right || dir === Direction.left) {
        f(iNext, jNext, visited, Direction.up);
        f(iNext, jNext, visited, Direction.down);
      } else {
        dir === Direction.down
          ? f(iNext, j, visited, dir)
          : f(iNext, j, visited, dir);
      }
    }
    if (nextItem === Tiles.dot) {
      f(iNext, jNext, visited, dir);
    }
    if (nextItem === Tiles.pipeHor) {
      if (dir === Direction.left || dir === Direction.right) {
        dir === Direction.left
          ? f(iNext, jNext, visited, dir)
          : f(iNext, jNext, visited, dir);
      } else {
        f(iNext, jNext, visited, Direction.left);
        f(iNext, jNext, visited, Direction.right);
      }
    }
    if (nextItem === Tiles.mirrorLeft) {
      if (dir === Direction.left) {
        f(iNext, jNext, visited, Direction.down);
      }
      if (dir === Direction.right) {
        f(iNext, jNext, visited, Direction.up);
      }
      if (dir === Direction.down) {
        f(iNext, jNext, visited, Direction.left);
      }
      if (dir === Direction.up) {
        f(iNext, jNext, visited, Direction.right);
      }
    }
    if (nextItem === Tiles.mirrorRight) {
      if (dir === Direction.left) {
        f(iNext, jNext, visited, Direction.up);
      }
      if (dir === Direction.right) {
        f(iNext, jNext, visited, Direction.down);
      }
      if (dir === Direction.down) {
        f(iNext, jNext, visited, Direction.right);
      }
      if (dir === Direction.up) {
        f(iNext, jNext, visited, Direction.left);
      }
    }
  };

  f(0, 0, [], Direction.down);

  return activated.size;
};

console.log(countTiles());
