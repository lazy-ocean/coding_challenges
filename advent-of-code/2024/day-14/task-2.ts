/* --- Part Two ---
During the bathroom break, someone notices that these robots seem awfully similar to ones built and used at the North Pole. If they're the same type of robots, they should have a hard-coded Easter egg: very rarely, most of the robots should arrange themselves into a picture of a Christmas tree.

What is the fewest number of seconds that must elapse for the robots to display the Easter egg?s
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-14/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n").map((line) => {
  const [p, v] = line.split(" ");
  const pos = p.split("=")[1].split(",").map(Number);
  const vel = v.split("=")[1].split(",").map(Number);
  return { pos, vel };
});

const maxx = 103;
const maxy = 101;

const findPos = ({ pos, vel, sec }) => {
  const [x, y] = pos;
  const [velx, vely] = vel;

  let newposx = vely * sec + y;

  while (newposx < 0) {
    newposx = maxx + newposx;
  }

  while (newposx >= maxx) {
    newposx = 0 + (newposx - maxx);
  }

  let newposy = velx * sec + x;
  while (newposy < 0) {
    newposy = maxy + newposy;
  }

  while (newposy >= maxy) {
    newposy = 0 + (newposy - maxy);
  }

  return `${newposx};${newposy}`;
};

const findPositions = (sec) => {
  const positions = [];

  input.forEach((line) => {
    positions.push(findPos({ ...line, sec }));
  });

  return positions;
};

const f = () => {
  let sec = 101;

  while (true) {
    const res = findPositions(sec);
    if (res.length === new Set(res).size) return sec;
    sec++;
  }
};

console.log(f());
