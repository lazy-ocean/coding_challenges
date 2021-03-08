const solution = require("./solution");

const tests = {
  1: [["1 2 3 4 5"], "5 1"],
  2: [["1 2 -3 4 5"], "5 -3"],
  3: [["1 9 3 4 -5"], "9 -5"],
  4: [["4 5 29 54 4 0 -214 542 -64 1 -3 6 -6"], "542 -214"],
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
