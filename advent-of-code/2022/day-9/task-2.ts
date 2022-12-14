/* --- Part Two ---
A rope snaps! Suddenly, the river is getting a lot closer than you remember. The bridge is still there, but some of the ropes that broke are now whipping toward you as you fall through the air!

The ropes are moving too quickly to grab; you only have a few seconds to choose how to arch your body to avoid being hit. Fortunately, your simulation can be extended to support longer ropes.

Rather than two knots, you now must simulate a rope consisting of ten knots. One knot is still the head of the rope and moves according to the series of motions. Each knot further down the rope follows the knot in front of it using the same rules as before.

Using the same series of motions as the above example, but with the knots marked H, 1, 2, ..., 9, the motions now occur as follows:

== Initial State ==

......
......
......
......
H.....  (H covers 1, 2, 3, 4, 5, 6, 7, 8, 9, s)

== R 4 ==

......
......
......
......
1H....  (1 covers 2, 3, 4, 5, 6, 7, 8, 9, s)

......
......
......
......
21H...  (2 covers 3, 4, 5, 6, 7, 8, 9, s)

......
......
......
......
321H..  (3 covers 4, 5, 6, 7, 8, 9, s)

......
......
......
......
4321H.  (4 covers 5, 6, 7, 8, 9, s)

== U 4 ==

......
......
......
....H.
4321..  (4 covers 5, 6, 7, 8, 9, s)

......
......
....H.
.4321.
5.....  (5 covers 6, 7, 8, 9, s)

......
....H.
....1.
.432..
5.....  (5 covers 6, 7, 8, 9, s)

....H.
....1.
..432.
.5....
6.....  (6 covers 7, 8, 9, s)

== L 3 ==

...H..
....1.
..432.
.5....
6.....  (6 covers 7, 8, 9, s)

..H1..
...2..
..43..
.5....
6.....  (6 covers 7, 8, 9, s)

.H1...
...2..
..43..
.5....
6.....  (6 covers 7, 8, 9, s)

== D 1 ==

..1...
.H.2..
..43..
.5....
6.....  (6 covers 7, 8, 9, s)

== R 4 ==

..1...
..H2..
..43..
.5....
6.....  (6 covers 7, 8, 9, s)

..1...
...H..  (H covers 2)
..43..
.5....
6.....  (6 covers 7, 8, 9, s)

......
...1H.  (1 covers 2)
..43..
.5....
6.....  (6 covers 7, 8, 9, s)

......
...21H
..43..
.5....
6.....  (6 covers 7, 8, 9, s)

== D 1 ==

......
...21.
..43.H
.5....
6.....  (6 covers 7, 8, 9, s)

== L 5 ==

......
...21.
..43H.
.5....
6.....  (6 covers 7, 8, 9, s)

......
...21.
..4H..  (H covers 3)
.5....
6.....  (6 covers 7, 8, 9, s)

......
...2..
..H1..  (H covers 4; 1 covers 3)
.5....
6.....  (6 covers 7, 8, 9, s)

......
...2..
.H13..  (1 covers 4)
.5....
6.....  (6 covers 7, 8, 9, s)

......
......
H123..  (2 covers 4)
.5....
6.....  (6 covers 7, 8, 9, s)

== R 2 ==

......
......
.H23..  (H covers 1; 2 covers 4)
.5....
6.....  (6 covers 7, 8, 9, s)

......
......
.1H3..  (H covers 2, 4)
.5....
6.....  (6 covers 7, 8, 9, s)
Now, you need to keep track of the positions the new tail, 9, visits. In this example, the tail never moves, and so it only visits 1 position. However, be careful: more types of motion are possible than before, so you might want to visually compare your simulated rope to the one above.

Simulate your complete series of motions on a larger rope with ten knots. How many positions does the tail of the rope visit at least once?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-9/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n");

enum Direction {
  asc,
  desc,
}

interface Knot {
  x: number;
  y: number;
}

const countVisitedCells = (data: string[]): number => {
  const visited: string[] = [];
  const knots: { [key: number]: Knot } = {
    0: { x: 0, y: 0 },
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
    6: { x: 0, y: 0 },
    7: { x: 0, y: 0 },
    8: { x: 0, y: 0 },
    9: { x: 0, y: 0 },
  };

  const moveTail = (prev: Knot, curr: Knot, isTail: boolean) => {
    const trailingHorizontallly = Math.abs(prev.x - curr.x) > 1;
    const traillingVertically = Math.abs(prev.y - curr.y) > 1;
    if (trailingHorizontallly || traillingVertically) {
      // move tail in one dir only
      if (prev.x === curr.x || prev.y === curr.y) {
        if (traillingVertically) {
          curr.y = prev.y > curr.y ? curr.y + 1 : curr.y - 1;
        } else {
          curr.x = prev.x > curr.x ? curr.x + 1 : curr.x - 1;
        }
      } else {
        // move tail diagonally
        curr.x = prev.x > curr.x ? curr.x + 1 : curr.x - 1;
        curr.y = prev.y > curr.y ? curr.y + 1 : curr.y - 1;
      }
    }
    if (isTail) {
      const pos = `${curr.x};${curr.y}`;
      if (!visited.includes(pos)) visited.push(pos);
    }
  };

  data.forEach((instr) => {
    const [dir, n] = instr.split(" ");
    const mathDir = dir === "R" || dir === "U" ? Direction.asc : Direction.desc;
    const steps = mathDir === Direction.asc ? Number(n) : -Number(n);
    const head = knots[0];
    if (dir === "R" || dir === "L") {
      const goal = head.x + steps;
      while (head.x !== goal) {
        head.x = mathDir === Direction.asc ? head.x + 1 : head.x - 1;
        for (let i = 0; i < 9; i++) {
          moveTail(knots[i], knots[i + 1], i + 1 === 9);
        }
      }
    }
    if (dir === "U" || dir === "D") {
      const goal = head.y + steps;
      while (head.y !== goal) {
        head.y = mathDir === Direction.asc ? head.y + 1 : head.y - 1;
        for (let i = 0; i < 9; i++) {
          moveTail(knots[i], knots[i + 1], i + 1 === 9);
        }
      }
    }
  });
  return visited.length;
};

console.log(countVisitedCells(input));
