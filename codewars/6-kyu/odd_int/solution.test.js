const solution = require("./solution");

const tests = {
  "test 1": [[[20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5]], 5],
  "test 2": [[[1, 1, 2, -2, 5, 2, 4, 4, -1, -2, 5]], -1],
  "test 3": [[[20, 1, 1, 2, 2, 3, 3, 5, 5, 4, 20, 4, 5]], 5],
  "test 4": [[[10]], 10],
  "test 5": [[[1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1]], 10],
  "test 6": [[[5, 4, 3, 2, 1, 5, 4, 3, 2, 10, 10]], 1],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
