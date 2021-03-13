const solution = require("./solution");

const tests = {
  1: [
    [
      [1, 0, 0],
      [0, 1, 0],
    ],
    [0, 0, 1],
  ],
  2: [
    [
      [3, 2, 1],
      [1, 2, 3],
    ],
    [4, -8, 4],
  ],
  3: [
    [
      [3, 2],
      [1, 2, 3],
    ],
    Error,
  ],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
