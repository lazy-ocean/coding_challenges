const solution = require("./solution");

const tests = {
  1: [[[1, 2, 3, 4]], "1,2,3,4"],
  2: [[["a", "b", "c", "d"]], "a,b,c,d"],
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
