const solution = require("./solution");

const tests = {
  "empty arr": [[[]], 0],
  mixed: [[[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6],
  positives: [[[1, 2, 3, 4, 5]], 15],
  negatives: [[[-1, -1, -3, -4]], 0],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
