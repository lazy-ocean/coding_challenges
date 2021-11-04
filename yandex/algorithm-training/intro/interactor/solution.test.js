const solution = require("./solution.ts");

const tests = {
  1: [[0, 0, 0], 0],
  2: [[-1, 0, 1], 3],
  3: [[42, 1, 6], 6],
  4: [[44, 7, 4], 1],
  5: [[1, 4, 0], 3],
  6: [[-3, 2, 4], 2],
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
