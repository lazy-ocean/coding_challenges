const solution = require("./solution");

const tests = {
  1: [[16], 7],
  2: [[942], 6],
  3: [[132189], 6],
  4: [[493193], 2],
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
