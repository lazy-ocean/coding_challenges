const solution = require("./solution");

const tests = {
  1: [[123], 321],
  2: [[-123], -321],
  3: [[120], 21],
  4: [[0], 0],
  5: [[1534236469], 0],
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
