const solution = require("./solution.ts");

const tests = {
  1: [[4, [1, 2, 3, 4]], 3],
  2: [[3, [-1, 0, 1]], 0],
  3: [[5, [1, 2, 5, 7, 10]], 5],
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
