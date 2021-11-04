const solution = require("./solution.ts");

const tests = {
  "might be both": [[1, 2, 2003], 0],
  american: [[1, 29, 2008], 1],
  "doesn't matter, same date": [[1, 1, 2000], 1],
  "american 2": [[1, 15, 2000], 1],
  european: [[15, 1, 2000], 1],
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
