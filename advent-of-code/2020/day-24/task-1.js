const fs = require("fs");
const _ = require("lodash");

let data = fs.readFileSync("day-24/data.txt", "utf8", (err, data) => {});
let input = data.split("\n");

const directions = {
  e: { x: 1 },
  se: { y: -1, x: 0.5 },
  sw: { y: -1, x: -0.5 },
  w: { x: -1 },
  nw: { y: 1, x: -0.5 },
  ne: { y: 1, x: 0.5 },
};
let testLine = ["esew", "nwwswee", "ew"];

const findDirections = (input) => {
  let dirs = Object.keys(directions);
  let visitedTiles = [];

  input.forEach((line) => {
    let currPosition = {
      x: 0,
      y: 0,
      c: "black",
    };
    for (let i = 0; i < line.length; i++) {
      let way = null;
      if (dirs.includes(line[i])) {
        way = directions[line[i]];
      } else {
        way = directions[`${line[i]}${line[i + 1]}`];
        i++;
      }
      Object.keys(way).forEach((key) => {
        currPosition[key] += way[key];
      });
    }
    let ifVisited = visitedTiles.find((tile) => _.isEqual(tile, currPosition));
    if (ifVisited) {
      let index = visitedTiles.indexOf(ifVisited);
      visitedTiles[index].c =
        visitedTiles[index].c === "white" ? "black" : "white";
    } else visitedTiles.push(currPosition);
  });
  let blackTiles = visitedTiles.filter((tile) => tile.c === "black");
  return blackTiles.length;
};

console.log(findDirections(input));
