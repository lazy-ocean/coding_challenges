const solution = require("./solution");

const tests = {
  1: [
    [
      [
        [1, 3],
        [6, 9],
      ],
      [2, 5],
    ],
    [
      [1, 5],
      [6, 9],
    ],
  ],
  2: [
    [
      [
        [1, 2],
        [3, 5],
        [6, 7],
        [8, 10],
        [12, 16],
      ],
      [4, 8],
    ],
    [
      [1, 2],
      [3, 10],
      [12, 16],
    ],
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
