const solution = require("./solution");

const tests = {
  1: [[["h", "e", "l", "l", "o"]], ["o", "l", "l", "e", "h"]],
  2: [[["H", "a", "n", "n", "a", "h"]], ["h", "a", "n", "n", "a", "H"]],
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
