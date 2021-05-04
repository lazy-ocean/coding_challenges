const solution = require("./solution");

const tests = {
  1: [['hello', 'll'], 2],
  2: [['aaa', 'bb'], -1],
  3: [['aaa', ''], 0],
  3: [['aaa', 'aaaa'], -1],
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
