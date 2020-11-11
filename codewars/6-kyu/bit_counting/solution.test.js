const solution = require("./solution");

const tests = {
  "test 1": [0, 0],
  "test 2": [4, 1],
  "test 3": [7, 3],
  "test 4": [9, 2],
  "test 5": [10, 2],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
