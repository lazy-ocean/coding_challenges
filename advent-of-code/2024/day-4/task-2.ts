/* --- Part Two ---
The Elf looks quizzically at you. Did you misunderstand the assignment?

Looking for the instructions, you flip over the word search to find that this isn't actually an XMAS puzzle; it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:

M.S
.A.
M.S
Irrelevant characters have again been replaced with . in the above diagram. Within the X, each MAS can be written forwards or backwards.

Here's the same example from before, but this time all of the X-MASes have been kept instead:

.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
In this example, an X-MAS appears 9 times.

Flip the word search from the instructions back over to the word search side and try again. How many times does an X-MAS appear?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-4/data.txt",
  "utf8",
  () => null
);

const input: string[][] = dataset.split("\n").map((line) => line.split(""));

const mas = "MAS";
const sam = "SAM";

const findXmases = (data) => {
  let result = 0;
  let used = [];

  const searchNorthEast = (letter, i, j) => {
    if (!input[i - 2]?.[j + 2] || !input[i - 1]?.[j + 1]) return false;
    const res = letter + input[i - 1][j + 1] + input[i - 2][j + 2];
    if (res === mas || res === sam) {
      if (
        !used.includes(`NE;${i - 1};${j + 1}`) &&
        !used.includes(`SW;${i - 1};${j + 1}`)
      ) {
        used = [...used, `NE;${i - 1};${j + 1}`, `SW;${i - 1};${j + 1}`];
      }
    }
    return;
  };

  const searchSouthEast = (letter, i, j) => {
    if (!input[i + 1]?.[j + 1] || !input[i + 2]?.[j + 2]) return false;

    const res = letter + input[i + 1][j + 1] + input[i + 2][j + 2];
    if (res === mas || res === sam) {
      if (
        !used.includes(`SE;${i + 1};${j + 1}`) &&
        !used.includes(`NW;${i + 1};${j + 1}`)
      ) {
        used = [...used, `SE;${i + 1};${j + 1}`, `NW;${i + 1};${j + 1}`];
      }
    }

    return;
  };

  const searchSouthWest = (letter, i, j) => {
    if (!input[i + 1]?.[j - 1] || !input[i + 2]?.[j - 2]) return false;
    const res = letter + input[i + 1][j - 1] + input[i + 2][j - 2];
    if (res === mas || res === sam) {
      if (
        !used.includes(`SW;${i + 1};${j - 1}`) &&
        !used.includes(`NE;${i + 1};${j - 1}`)
      ) {
        used = [...used, `SW;${i + 1};${j - 1}`, `NE;${i + 1};${j - 1}`];
      }
    }

    return;
  };

  const searchNorthWest = (letter, i, j) => {
    if (!input[i - 1]?.[j - 1] || !input[i - 2]?.[j - 2]) return false;
    const res = letter + input[i - 1][j - 1] + input[i - 2][j - 2];
    if (res === mas || res === sam) {
      if (
        !used.includes(`NW;${i - 1};${j - 1}`) &&
        !used.includes(`SE;${i - 1};${j - 1}`)
      ) {
        used = [...used, `NW;${i - 1};${j - 1}`, `SE;${i - 1};${j - 1}`];
        result++;
      }
    }
    return;
  };

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const curr = data[i][j];
      searchNorthEast(curr, i, j);
      searchSouthEast(curr, i, j);
      searchSouthWest(curr, i, j);
      searchNorthWest(curr, i, j);
    }
  }

  used.forEach((item) => {
    const [dir, x, y] = item.split(";");

    switch (dir) {
      case "SE":
        if (used.includes(`SW;${x};${y}`)) result++;
        break;
      case "SW":
        if (used.includes(`SE;${x};${y}`)) result++;
        break;
      case "NW":
        if (used.includes(`NE;${x};${y}`)) result++;
        break;
      case "NE":
        if (used.includes(`NW;${x};${y}`)) result++;
        break;
      default:
        break;
    }
  });

  return result / 4;
};

console.log(findXmases(input));
