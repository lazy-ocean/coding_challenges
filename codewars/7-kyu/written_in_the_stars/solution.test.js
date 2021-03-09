const solution = require("./solution");

const tests = {
  1: [[new Date(1970, 5, 5)], "Gemini"],
  2: [[new Date(2000, 1, 15)], "Aquarius"],
  3: [[new Date(1987, 7, 23)], "Leo"],
  4: [[new Date(1994, 7, 30)], "Virgo"],
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
