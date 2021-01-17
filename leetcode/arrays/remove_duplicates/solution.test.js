const solution = require("./solution");

const tests = {
  "test 1": [[[1, 1, 2]], 2],
  "test 2": [[[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], 5],
  "test 3": [[[0, 0, 0, 7, 9]], 3],
  "test 4": [[[0, 3, 6, 6, 8, 8, 8, 8, 8, 9]], 5],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
