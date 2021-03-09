const solution = require("./solution");

const tests = {
  "two years two dates": [[1999, 2000], "8/13/1999 10/13/2000"],
  "two years many dates": [
    [2014, 2015],
    "6/13/2014 2/13/2015 3/13/2015 11/13/2015",
  ],
  "one year one date": [[2000], "10/13/2000"],
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
