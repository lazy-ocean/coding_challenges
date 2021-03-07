const solution = require("./solution");

const tests = {
  "test 1": [[[0, 1, 0, 3, 12]], [1, 3, 12, 0, 0]],
  "test 2": [[[0, 0, 0, 3, 12]], [3, 12, 0, 0, 0]],
  "test 3": [[[1, 2, 0, 3, 4]], [1, 2, 3, 4, 0]],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
