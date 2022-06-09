const solution = require("./solution");

const tests = {
  1: [["III"], 3],
  2: [["LVIII"], 58],
  3: [["MCMXCIV"], 1994],
  4: [["MCMVCIV"], 1999],
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
