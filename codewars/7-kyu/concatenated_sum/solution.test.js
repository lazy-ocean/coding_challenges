const solution = require("./solution");

const tests = {
  2997: [[2997, 3], true],
  "-2997": [[-2997, 3], true],
  198: [[198, 2], true],
  1983: [[1983, 3], false],
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
