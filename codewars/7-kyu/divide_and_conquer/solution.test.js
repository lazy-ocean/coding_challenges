const solution = require("./solution");

const tests = {
  1: [[[9, 3, "7", "3"]], 2],
  2: [[["5", "0", 9, 3, 2, 1, "9", 6, 7]], 14],
  3: [[["3", 6, 6, 0, "5", 8, 5, "6", 2, "0"]], 13],
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
