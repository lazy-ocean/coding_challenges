/* --- Day 24: Never Tell Me The Odds ---
It seems like something is going wrong with the snow-making process. Instead of forming snow, the water that's been absorbed into the air seems to be forming hail!

Maybe there's something you can do to break up the hailstones?

Due to strong, probably-magical winds, the hailstones are all flying through the air in perfectly linear trajectories. You make a note of each hailstone's position and velocity (your puzzle input). For example:

19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3
Each line of text corresponds to the position and velocity of a single hailstone. The positions indicate where the hailstones are right now (at time 0). The velocities are constant and indicate exactly how far each hailstone will move in one nanosecond.

Each line of text uses the format px py pz @ vx vy vz. For instance, the hailstone specified by 20, 19, 15 @ 1, -5, -3 has initial X position 20, Y position 19, Z position 15, X velocity 1, Y velocity -5, and Z velocity -3. After one nanosecond, the hailstone would be at 21, 14, 12.

Perhaps you won't have to do anything. How likely are the hailstones to collide with each other and smash into tiny ice crystals?

To estimate this, consider only the X and Y axes; ignore the Z axis. Looking forward in time, how many of the hailstones' paths will intersect within a test area? (The hailstones themselves don't have to collide, just test for intersections between the paths they will trace.)

In this example, look for intersections that happen with an X and Y position each at least 7 and at most 27; in your actual data, you'll need to check a much larger test area. Comparing all pairs of hailstones' future paths produces the following results:

Hailstone A: 19, 13, 30 @ -2, 1, -2
Hailstone B: 18, 19, 22 @ -1, -1, -2
Hailstones' paths will cross inside the test area (at x=14.333, y=15.333).

Hailstone A: 19, 13, 30 @ -2, 1, -2
Hailstone B: 20, 25, 34 @ -2, -2, -4
Hailstones' paths will cross inside the test area (at x=11.667, y=16.667).

Hailstone A: 19, 13, 30 @ -2, 1, -2
Hailstone B: 12, 31, 28 @ -1, -2, -1
Hailstones' paths will cross outside the test area (at x=6.2, y=19.4).

Hailstone A: 19, 13, 30 @ -2, 1, -2
Hailstone B: 20, 19, 15 @ 1, -5, -3
Hailstones' paths crossed in the past for hailstone A.

Hailstone A: 18, 19, 22 @ -1, -1, -2
Hailstone B: 20, 25, 34 @ -2, -2, -4
Hailstones' paths are parallel; they never intersect.

Hailstone A: 18, 19, 22 @ -1, -1, -2
Hailstone B: 12, 31, 28 @ -1, -2, -1
Hailstones' paths will cross outside the test area (at x=-6, y=-5).

Hailstone A: 18, 19, 22 @ -1, -1, -2
Hailstone B: 20, 19, 15 @ 1, -5, -3
Hailstones' paths crossed in the past for both hailstones.

Hailstone A: 20, 25, 34 @ -2, -2, -4
Hailstone B: 12, 31, 28 @ -1, -2, -1
Hailstones' paths will cross outside the test area (at x=-2, y=3).

Hailstone A: 20, 25, 34 @ -2, -2, -4
Hailstone B: 20, 19, 15 @ 1, -5, -3
Hailstones' paths crossed in the past for hailstone B.

Hailstone A: 12, 31, 28 @ -1, -2, -1
Hailstone B: 20, 19, 15 @ 1, -5, -3
Hailstones' paths crossed in the past for both hailstones.
So, in this example, 2 hailstones' future paths cross inside the boundaries of the test area.

However, you'll need to search a much larger test area if you want to see if any hailstones might collide. Look for intersections that happen with an X and Y position each at least 200000000000000 and at most 400000000000000. Disregard the Z axis entirely.

Considering only the X and Y axes, check all pairs of hailstones' future paths for intersections. How many of these intersections occur within the test area?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-24/data.txt",
  "utf8",
  () => null
);

const boundMin = 200000000000000;
const boundMax = 400000000000000;

const findSecondPoint = (i) => {
  const [line, diff] = i;
  return [line, [line[0] + diff[0], line[1] + diff[1], line[2] + diff[2]]];
};

const input = dataset
  .split("\n")
  .map((line) => line.split(" @ ").map((l) => l.split(", ").map(Number)))
  .map((r) => findSecondPoint(r));

const findSlope = ([p1, p2]) => (p2[1] - p1[1]) / (p2[0] - p1[0]);

// y = mx + b - line equation
const findIntersection = (line1, line2) => {
  const m1 = findSlope(line1);
  const m2 = findSlope(line2);

  if (m1 === m2) return false;

  // y = mx + b => b = y - mx
  const b1 = line1[0][1] - m1 * line1[0][0];
  const b2 = line2[0][1] - m2 * line2[0][0];

  // if such common x exists, then m1x + b1 = m2x + b2
  // m1 + b1/x = m2 + b2/x
  // m1 - m2 = (b2 - b1) / x
  // (b2 - b1) / (m1 - m2)
  const commonX = (b2 - b1) / (m1 - m2);
  const commonY = m1 * commonX + b1;

  return { commonX, commonY };
};

const checkIfInPast = (line, intersector) => {
  const [a, b] = line;

  if (a[0] < b[0]) {
    if (intersector.commonX < a[0]) return true;
  } else if (intersector.commonX > b[0]) return true;

  return false;
};

const findIntersections = () => {
  const checkIfValid = (int) => {
    const { commonX, commonY } = int;
    return (
      commonX < boundMax &&
      commonX > boundMin &&
      commonY < boundMax &&
      commonY > boundMin
    );
  };

  const valid = [];

  input.forEach((line, idx) => {
    for (let i = idx + 1; i < input.length; i++) {
      const intersection = findIntersection(line, input[i]);

      if (checkIfValid(intersection)) {
        if (
          !checkIfInPast(line, intersection) &&
          !checkIfInPast(input[i], intersection)
        ) {
          valid.push(intersection);
        }
      }
    }
  });

  return valid.length;
};

console.log(findIntersections());
