/* eslint-disable no-restricted-syntax */
/* --- Day 4: Giant Squid ---
--- Part Two ---
On the other hand, it might be wise to try a different strategy: let the giant squid win.

You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its arms, the safe thing to do is to figure out which board will win last and choose that one. That way, no matter which boards it picks, it will win for sure.

In the above example, the second board is the last to win, which happens after 13 is eventually called and its middle column is completely marked. If you were to keep playing until this point, the second board would have a sum of unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.

Figure out which board will win last. Once it wins, what would its final score be?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-4/data.txt",
  "utf8",
  () => null
);
const input: string[] = dataset.split("\n\n");
const set = input[0].split(",");

const formatBoards = () => {
  const boards = [];
  for (let i = 1; i < input.length; i++) {
    const board = input[i].split("\n");
    const splitBoard = board.map((line) => line.split(" ").filter(Boolean));
    boards.push(splitBoard);
  }
  return boards;
};

const countPoints = (board: number[][], winningNum: number): number =>
  board
    .flat()
    .filter(Number)
    .reduce((a, b) => Number(a) + Number(b)) * winningNum;

const findLosingBoard = (): number => {
  const boards = formatBoards();
  for (const bingoNum of set) {
    for (let i = 0; i < boards.length; i++) {
      for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 5; k++) {
          if (boards[i]) {
            if (boards[i] && boards[i][j][k] === bingoNum)
              boards[i][j][k] = "*";
            const column = [];
            for (let l = 0; l < 5; l++) {
              column.push(boards[i][l][k]);
            }
            if (
              boards[i][j].filter((item) => item !== "*").length === 0 ||
              column.filter((item) => item !== "*").length === 0
            ) {
              if (boards.filter(Boolean).length === 1) {
                return countPoints(boards[i], Number(bingoNum));
              }
              boards[i] = null;
            }
          }
        }
      }
    }
  }
  return null;
};

console.log(findLosingBoard());
