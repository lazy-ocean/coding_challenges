/* --- Part Two ---
The lanternfish use your information to find a safe moment to swim in and turn off the malfunctioning robot! Just as they start preparing a festival in your honor, reports start coming in that a second warehouse's robot is also malfunctioning.

This warehouse's layout is surprisingly similar to the one you just helped. There is one key difference: everything except the robot is twice as wide! The robot's list of movements doesn't change.

To get the wider warehouse's map, start with your original map and, for each tile, make the following changes:

If the tile is #, the new map contains ## instead.
If the tile is O, the new map contains [] instead.
If the tile is ., the new map contains .. instead.
If the tile is @, the new map contains @. instead.
This will produce a new warehouse map which is twice as wide and with wide boxes that are represented by []. (The robot does not change size.)

The larger example from before would now look like this:

####################
##....[]....[]..[]##
##............[]..##
##..[][]....[]..[]##
##....[]@.....[]..##
##[]##....[]......##
##[]....[]....[]..##
##..[][]..[]..[][]##
##........[]......##
####################
Because boxes are now twice as wide but the robot is still the same size and speed, boxes can be aligned such that they directly push two other boxes at once. For example, consider this situation:

#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^
After appropriately resizing this map, the robot would push around these boxes as follows:

Initial state:
##############
##......##..##
##..........##
##....[][]@.##
##....[]....##
##..........##
##############

Move <:
##############
##......##..##
##..........##
##...[][]@..##
##....[]....##
##..........##
##############

Move v:
##############
##......##..##
##..........##
##...[][]...##
##....[].@..##
##..........##
##############

Move v:
##############
##......##..##
##..........##
##...[][]...##
##....[]....##
##.......@..##
##############

Move <:
##############
##......##..##
##..........##
##...[][]...##
##....[]....##
##......@...##
##############

Move <:
##############
##......##..##
##..........##
##...[][]...##
##....[]....##
##.....@....##
##############

Move ^:
##############
##......##..##
##...[][]...##
##....[]....##
##.....@....##
##..........##
##############

Move ^:
##############
##......##..##
##...[][]...##
##....[]....##
##.....@....##
##..........##
##############

Move <:
##############
##......##..##
##...[][]...##
##....[]....##
##....@.....##
##..........##
##############

Move <:
##############
##......##..##
##...[][]...##
##....[]....##
##...@......##
##..........##
##############

Move ^:
##############
##......##..##
##...[][]...##
##...@[]....##
##..........##
##..........##
##############

Move ^:
##############
##...[].##..##
##...@.[]...##
##....[]....##
##..........##
##..........##
##############
This warehouse also uses GPS to locate the boxes. For these larger boxes, distances are measured from the edge of the map to the closest edge of the box in question. So, the box shown below has a distance of 1 from the top edge of the map and 5 from the left edge of the map, resulting in a GPS coordinate of 100 * 1 + 5 = 105.

##########
##...[]...
##........
In the scaled-up version of the larger example from above, after the robot has finished all of its moves, the warehouse would look like this:

####################
##[].......[].[][]##
##[]...........[].##
##[]........[][][]##
##[]......[]....[]##
##..##......[]....##
##..[]............##
##..@......[].[][]##
##......[][]..[]..##
####################
The sum of these boxes' GPS coordinates is 9021.

Predict the motion of the robot and boxes in this new, scaled-up warehouse. What is the sum of all boxes' final GPS coordinates?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-15/test.txt",
  "utf8",
  () => null
);

const [mapData, instructionsData] = dataset.split("\n\n");

const warehouse = mapData
  .split("\n")
  .map((line) => line.replaceAll("#", "##"))
  .map((line) => line.replaceAll(".", ".."))
  .map((line) => line.replaceAll("O", "[]"))
  .map((line) => line.split(""));
console.log(warehouse);

const instructions = instructionsData.split("").filter((item) => item !== "\n");

let init = null;

const children = {};
const boxesMap = {};

warehouse.forEach((line, x) => {
  line.forEach((item, y) => {
    if (item === "[") {
      if (!boxesMap[x]) {
        boxesMap[x] = new Set();
      }
      boxesMap[x].add(y);
      boxesMap[x].add(y + 1);
      children[`${x};${y}`] = y + 1;
      children[`${x};${y + 1}`] = y;
    }

    if (item === "@") init = [x, y];
  });
});
console.log(boxesMap);
enum Step {
  "down" = "v",
  "up" = "^",
  "left" = "<",
  "right" = ">",
}

const nextItemIndex = (x, y, step) => {
  switch (step) {
    case Step.down:
      return [x + 1, y];
    case Step.up:
      return [x - 1, y];
    case Step.left:
      return [x, y - 1];
    case Step.right:
    default:
      return [x, y + 1];
  }
};

const stepsMap = (x, y, step) => {
  switch (step) {
    case Step.down:
      return warehouse[x + 1] && warehouse[x + 1][y] !== "#"
        ? [x + 1, y]
        : false;
    case Step.up:
      return warehouse[x - 1] && warehouse[x - 1][y] !== "#"
        ? [x - 1, y]
        : false;
    case Step.left:
      return warehouse[x][y - 1] && warehouse[x][y - 1] !== "#"
        ? [x, y - 1]
        : false;
    case Step.right:
    default:
      return warehouse[x][y + 1] && warehouse[x][y + 1] !== "#"
        ? [x, y + 1]
        : false;
  }
};

const moveBoxes = (x, y, direction) => {
  const [nextx, nexty] = nextItemIndex(x, y, direction);
  let currX = x;
  let currY = y;
  const secondPartY = children[`${currX};${currY}`];

  let nextx2 = null;
  let nexty2 = null;
  if (direction === Step.down || direction === Step.up) {
    [nextx2, nexty2] = nextItemIndex(currX, secondPartY, direction);
  }

  let moved = false;

  while (true) {
    if (
      nextx < 0 ||
      nextx >= warehouse.length ||
      nexty < 0 ||
      nexty >= warehouse[0].length ||
      (nextx2 && nextx2 < 0) ||
      (nextx2 && nextx2 >= warehouse.length) ||
      (nextx2 && nexty2 < 0) ||
      (nextx2 && nexty2 >= warehouse[0].length)
    ) {
      break;
    }

    if (!boxesMap[nextx]?.has(nexty)) {
      if ((nextx2 && !boxesMap[nextx2]?.has(nexty2)) || !nextx2) {
        boxesMap[currX].delete(currY);
        if (nextx2) boxesMap[currX].delete(secondPartY);

        delete children[`${currX};${currY}`];
        delete children[`${currX};${secondPartY}`];

        if (!boxesMap[nextx]) {
          boxesMap[nextx] = new Set();
        }
        boxesMap[nextx].add(nexty);

        if (nextx2) {
          ą;
          if (!boxesMap[nextx2]) {
            boxesMap[nextx2] = new Set();
          }
          boxesMap[nextx2].add(nexty2);
        }

        children[`${nextx};${nexty}`] = nextx2 ? nexty2 : nexty + 1;
        nextx2
          ? (children[`${nextx};${nextx2}`] = nexty)
          : (children[`${nextx};${nexty + 1}`] = nexty);

        moved = true;
        break;
      }
    }

    if (!moveBoxes(nextx, nexty, direction)) {
      /*       console.log("wemwwo"); */
      break;
    }
  }

  return moved;
};

const drawMap = (curr: [number, number], dir) => {
  const newMap = warehouse.map((line, x) =>
    line
      .map((item, y) => {
        if (item === "#") {
          return "#"; // Keep the walls as #
        }
        if (x === curr[0] && y === curr[1]) {
          return "@"; // Place the robot at the current position
        }
        if (boxesMap[x] && boxesMap[x].has(y)) {
          return "0"; // Place a box at the position from boxesMap
        }
        return "."; // Default to empty space
      })
      .join("")
  );

  const mapOutput =
    dir.toString() + curr.toString() + "\n" + newMap.join("\n") + "\n\n"; // Create the map output as a string
  fs.appendFileSync("warehouse_steps.txt", mapOutput);
};

const makeSteps = () => {
  let curr = init;
  instructions.forEach((instr) => {
    const nextPos = stepsMap(curr[0], curr[1], instr);

    if (nextPos) {
      const [x, y] = nextPos;
      if (boxesMap[x] && boxesMap[x].has(y)) {
        const moved = moveBoxes(x, y, instr);
        if (moved) curr = nextPos;
      } else curr = nextPos;
    }
    drawMap(curr, instr);
  });

  return boxesMap;
};

const countBoxesDistance = () => {
  let res = 0;
  Object.keys(boxesMap).forEach((key) => {
    const currres = Number(key) * 100;

    const items = boxesMap[key];
    items.forEach((item) => {
      res += currres + item;
    });
  });

  return res;
};

console.log(makeSteps());
console.log(countBoxesDistance());
