const solution = require("./solution");

const tests = {
  1: [[[1, 2, 3, 4, 5]], 4],
  2: [[[7, 6, 4, 3, 1]], 0],
  3: [[[21, 35, 245, 324, 16, 34, 90]], 303],
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
