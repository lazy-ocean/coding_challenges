const solution = require("./solution");

const tests = {
  1: [[1], 40],
  2: [[2], 80],
  3: [[3], 100],
  4: [[4], 140],
  5: [[5], 180],
  6: [[6], 220],
  7: [[7], 230],
  8: [[8], 270],
  9: [[9], 310],
  10: [[10], 350],
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
