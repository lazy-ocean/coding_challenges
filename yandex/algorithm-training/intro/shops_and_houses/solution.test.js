const solution = require("./solution.ts");

const tests = {
  "test from task": [[[2, 0, 1, 1, 0, 1, 0, 2, 1, 2]], 3],
  "same distance": [[[2, 0, 1, 1, 0, 2]], 2],
  "small distance": [[[2, 2, 1, 1, 2, 2]], 1],
  "gigantic distance": [[[2, 2, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 1]], 7],
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
