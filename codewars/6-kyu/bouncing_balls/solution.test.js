const solution = require("./solution");

const tests = {
  "ball 1": [[3.0, 0.66, 1.5], 3],
  "ball 2": [[30.0, 0.66, 1.5], 15],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
