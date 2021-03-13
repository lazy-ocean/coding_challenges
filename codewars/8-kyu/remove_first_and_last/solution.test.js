const solution = require("./solution");

const tests = {
  1: [[""], null],
  2: [["1"], null],
  3: [["1, 3"], null],
  4: [["1,2,3"], "2"],
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
