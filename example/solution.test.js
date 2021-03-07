const solution = require("./solution");

const tests = {
  "adds 1 + 2 to equal 3": [[1, 2], 3],
  "adds 1 + 5 to equal 6": [[1, 5], 6],
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
