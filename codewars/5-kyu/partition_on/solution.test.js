const solution = require("./solution");

const items = [1, 2, 3, 4, 5, 6];
const isEven = (n) => n % 2 === 0;
const isOdd = (n) => n % 2 !== 0;
const lessThan3 = (n) => n < 3;

const tests = {
  1: [[isEven, items], 3],
  2: [[isOdd, items], 3],
  3: [[lessThan3, items], 4],
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
