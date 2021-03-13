const solution = require("./solution");

const tests = {
  even: [["test"], "es"],
  odd1: [["testing"], "t"],
  even1: [["middle"], "dd"],
  "one letter": [["A"], "A"],
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
