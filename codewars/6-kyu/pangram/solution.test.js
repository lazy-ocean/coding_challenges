const solution = require("./solution");

const tests = {
  pangram: ["The quick brown fox jumps over the lazy dog.", true],
  not: ["This is not a pangram.", false],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
