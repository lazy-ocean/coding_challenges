const solution = require("./solution");

const matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const matrix2 = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
  [17, 18, 19, 20],
];
const matrix3 = [[1]];

test("3x3", () => {
  solution(matrix1);
  expect(matrix1).toStrictEqual([
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ]);
});

test("4x5", () => {
  solution(matrix2);
  expect(matrix2).toStrictEqual([
    [17, 15, 13, 2, 5],
    [18, 14, 3, 4, 1],
    [19, 12, 6, 8, 9],
    [20, 16, 7, 10, 11],
  ]);
});

test("1x1", () => {
  solution(matrix3);
  expect(matrix3).toStrictEqual([[1]]);
});
