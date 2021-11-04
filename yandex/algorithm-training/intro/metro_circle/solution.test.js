const solution = require("./solution.ts");

const tests = {
  "exit next station": [[100, 5, 6], 0],
  "ride counterclockwise 1 station": [[10, 1, 9], 1],
  "ride clockwise 2 stations": [[10, 1, 4], 2],
  "ride counterclockwise 3 stations": [[10, 2, 7], 4],
  "ride clockwise 3 stations": [[10, 8, 4], 3],
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
