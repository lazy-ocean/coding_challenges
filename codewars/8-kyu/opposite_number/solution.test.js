const solution = require("./solution");

const tests = {
  1: [[6], -6],
  2: [[4], -4],
  3: [[0], 0],
  4: [[-1], 1],
  5: [[-34], 34],
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
