const solution = require("./solution");

const tests = {
  1: [
    [2, 5],
    [2, 4, 16, 256, 65536],
  ],
  2: [
    [3, 3],
    [3, 9, 81],
  ],
  3: [
    [5, 3],
    [5, 25, 625],
  ],
  4: [
    [10, 4],
    [10, 100, 10000, 100000000],
  ],
  invalid: [[2, 0], []],
  invalid2: [[2, -5], []],
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
