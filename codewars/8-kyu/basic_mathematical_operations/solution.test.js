const solution = require("./solution");

const tests = {
  1: [["+", 4, 7], 11],
  2: [["-", 15, 18], -3],
  3: [["*", 5, 5], 25],
  4: [["/", 49, 7], 7],
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
