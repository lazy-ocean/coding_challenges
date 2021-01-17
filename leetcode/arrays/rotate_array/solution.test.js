const solution = require("./solution");

const tests = {
  "test 1": [
    [[1, 2, 3, 4, 5, 6, 7], 3],
    [5, 6, 7, 1, 2, 3, 4],
  ],
  "test 2": [
    [[-1, -100, 3, 99], 2],
    [3, 99, -1, -100],
  ],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
