const solution = require("./solution");

const tests = {
  "simple integer": [[[4, 3, 2, 1]], [4, 3, 2, 2]],
  zero: [[[0]], [1]],
  "with 9": [[[4, 5, 6, 9, 9]], [4, 5, 7, 0, 0]],
  "with many zeros": [[[0, 0, 1]], [0, 0, 2]],
  "very big integer": [
    [[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]],
    [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 4],
  ],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toEqual(tests[testKey][1])
      : expect(solution(args)).toEqual(tests[testKey][1]);
  });
});
