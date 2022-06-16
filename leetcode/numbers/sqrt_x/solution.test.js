const solution = require("./solution");

const tests = {
  1: [[50], 7],
  2: [[4], 2],
  3: [[81], 9],
  4: [[0], 0],
  5: [[101], 10],
  6: [[7843], 88],
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
