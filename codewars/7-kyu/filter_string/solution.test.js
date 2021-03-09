const solution = require("./solution");

const tests = {
  "only nums": [["123"], 123],
  mixed: [["a1b2c3"], 123],
  "mixed 2": [["aa1bb2cc3dd"], 123],
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
