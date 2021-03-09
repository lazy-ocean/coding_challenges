const solution = require("./solution");

const plus = (a, b) => a + b;

const tests = {
  plus: [
    [plus, [0, 1, 2, 3, 4, 5], [6, 5, 4, 3, 2, 1]],
    [6, 6, 6, 6, 6, 6],
  ],
  "plus 1, short array 1": [
    [plus, [0, 1, 2, 3, 4], [6, 5, 4, 3, 2, 1]],
    [6, 6, 6, 6, 6],
  ],
  "plus 2, short array 2": [
    [plus, [0, 1, 2, 3, 4, 5], [6, 5, 4, 3, 2]],
    [6, 6, 6, 6, 6],
  ],
  "math.pow": [
    [Math.pow, [10, 10, 10, 10], [0, 1, 2, 3]],
    [1, 10, 100, 1000],
  ],
  "math.max": [
    [Math.max, [1, 4, 7, 1, 4, 7], [4, 7, 1, 4, 7, 1]],
    [4, 7, 7, 4, 7, 7],
  ],
  minus: [
    [(a, b) => a - b, [0, 1, 2, 3], [0, 1, 2, 3]],
    [0, 0, 0, 0],
  ],
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
