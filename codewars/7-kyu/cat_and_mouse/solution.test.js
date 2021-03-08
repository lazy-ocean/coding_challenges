const solution = require("./solution");

const tests = {
  caught: [
    [
      `..C......
  .........
  ....m....`,
    ],
    "Caught!",
  ],
  escaped: [
    [
      `................
................
......C.........
................
................
................
..............m.
................`,
      8,
    ],
    "Escaped!",
  ],
  "no animal": [
    [
      `..C......
  .........
  .........`,
    ],
    "boring without two animals",
  ],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
