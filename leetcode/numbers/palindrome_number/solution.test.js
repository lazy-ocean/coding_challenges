const solution = require("./solution");

const tests = {
  1: [[12121], true],
  2: [[15], false],
  3: [[-121], false],
  4: [[34785466458743], true],
  5: [[100], false],
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
