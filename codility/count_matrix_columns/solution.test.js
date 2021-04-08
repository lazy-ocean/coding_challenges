const solution = require("./solution");

const tests = {
  "public test 1": [[[10, 2, 32, 28, 3, 4], 3], 0],
  "public test 2": [[[3, 5, 2, 7, 8, 3], 2], 1],
  "public test 3": [[[3, 5, 2, 7, 8], 2], 0],
  "public test 4": [[[5, 6, 7, 7, 10, 9], 3], 1],
  "one item": [[[5], 3], 0],
  "one row": [[[5, 5, 5], 3], 0],
  "two rows": [[[5, 5, 5, 10, 15, 20], 3], 2],
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
