/* eslint-disable no-loop-func */

import { MirrorDir } from "./task-1";

/* --- Part Two ---
You resume walking through the valley of mirrors and - SMACK! - run directly into one. Hopefully nobody was watching, because that must have been pretty embarrassing.

Upon closer inspection, you discover that every mirror has exactly one smudge: exactly one . or # should be the opposite type.

In each pattern, you'll need to locate and fix the smudge that causes a different reflection line to be valid. (The old reflection line won't necessarily continue being valid after the smudge is fixed.)

Here's the above example again:

#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
The first pattern's smudge is in the top-left corner. If the top-left # were instead ., it would have a different, horizontal line of reflection:

1 ..##..##. 1
2 ..#.##.#. 2
3v##......#v3
4^##......#^4
5 ..#.##.#. 5
6 ..##..##. 6
7 #.#.##.#. 7
With the smudge in the top-left corner repaired, a new horizontal line of reflection between rows 3 and 4 now exists. Row 7 has no corresponding reflected row and can be ignored, but every other row matches exactly: row 1 matches row 6, row 2 matches row 5, and row 3 matches row 4.

In the second pattern, the smudge can be fixed by changing the fifth symbol on row 2 from . to #:

1v#...##..#v1
2^#...##..#^2
3 ..##..### 3
4 #####.##. 4
5 #####.##. 5
6 ..##..### 6
7 #....#..# 7
Now, the pattern has a different horizontal line of reflection between rows 1 and 2.

Summarize your notes as before, but instead use the new different reflection lines. In this example, the first pattern's new horizontal line has 3 rows above it and the second pattern's new horizontal line has 1 row above it, summarizing to the value 400.

In each pattern, fix the smudge and find the different line of reflection. What number do you get after summarizing the new reflection line in each pattern in your notes?


*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-13/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n\n").map((block) => block.split("\n"));

const traversal = (linesData, type: MirrorDir) => {
  let res = 0;
  let swap = false;
  let lines = [...linesData];
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i] === lines[i + 1]) {
      let j = 1;
      let match = true;
      while (match) {
        const a = lines[i - j];
        const b = lines[i + 1 + j];

        if (!a || !b) break;
        if (a !== b) {
          if (swap) {
            match = false;
            swap = false;
            lines = [...linesData];
            break;
          }

          const indices = [];
          const aNew = a.split("");
          aNew.forEach((item, idx) => {
            if (b[idx] !== item) indices.push(idx);
          });

          if (indices.length === 1) {
            aNew[indices[0]] = aNew[indices[0]] === "." ? "#" : ".";

            lines[i - j] = aNew.join("");
            j--;
            swap = true;
            match = true;
          } else match = false;
        }
        j++;
      }
      if (match && swap) {
        let sum = i + 1;
        if (type === MirrorDir.row) sum *= 100;
        res += sum;
        break;
      }
    } else {
      if (swap) {
        swap = false;
        lines = [...linesData];
        break;
      }

      const indices = [];
      const aNew = lines[i].split("");
      aNew.forEach((item, idx) => {
        if (lines[i + 1][idx] !== item) indices.push(idx);
      });

      if (indices.length === 1) {
        aNew[indices[0]] = aNew[indices[0]] === "." ? "#" : ".";
        lines[i] = aNew.join("");
        i--;
        swap = true;
      }
    }
  }
  return res;
};

const countArrangements = (): number => {
  let res = 0;

  input.forEach((block) => {
    const lines = block;

    // horizontal
    res += traversal(lines, MirrorDir.row);

    // vertical
    const columns = [];
    for (let j = 0; j < lines[0].length; j++) {
      let line = "";
      for (let i = lines.length - 1; i >= 0; i--) {
        line += lines[i][j];
      }
      columns.push(line);
    }

    res += traversal(columns, MirrorDir.col);
  });

  return res;
};

console.log(countArrangements());
