const solution = require("./solution.ts");

const tests = {
  "two maxes": [[[1, 2, 2, 1, 0]], 2],
  "one max": [[[1, 5, 0]], 1],
  "something after 0": [[[1, 5, 0, 5]], 1],
  "max first": [[[5, 5, 0]], 2],
  "starts with 0": [[[0, 5, 2, 0]], 0],
  "many maxes": [[[1, 2, 2, 1, 2, 2, 2, 2, 3, 0]], 6],
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
