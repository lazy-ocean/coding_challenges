const solution = require("./solution");

const tests = {
  1: [["[([{}])]"], true],
  2: [["({}{][})"], false],
  3: [["({]})"], false],
  4: [["]("], false],
  5: [["[]"], true],
  6: [["]["], false],
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
