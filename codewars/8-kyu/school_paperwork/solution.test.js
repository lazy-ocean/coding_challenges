const solution = require("./solution");

const tests = {
  1: [[1, 2], 2],
  2: [[3, 5], 15],
  3: [[0, 5], 0],
  4: [[3, -5], 0],
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
