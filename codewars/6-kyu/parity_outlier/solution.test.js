const solution = require("./solution");

const tests = {
  1: [[[0, 1, 2]], 1],
  2: [[[1, 2, 3]], 2],
  3: [[[2, 6, 8, 10, 3]], 3],
  4: [[[0, 0, 3, 0, 0]], 3],
  5: [[[1, 1, 0, 1, 1]], 0],
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
