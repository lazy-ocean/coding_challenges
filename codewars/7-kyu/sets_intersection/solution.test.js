const solution = require("./solution");

const A = new Set([1, 2]);
const B = new Set([2, 3]);
const C = new Set([2]);

const tests = {
  "A & A = A": [[A, A], A],
  "A & B = C": [[A, B], C],
  "A & C = C": [[A, C], C],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toEqual(tests[testKey][1])
      : expect(solution(args)).toEqual(tests[testKey][1]);
  });
});
