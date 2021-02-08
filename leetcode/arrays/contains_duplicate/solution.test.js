const solution = require("./solution");

const tests = {
  "true": [[[1,2,3,1]], true],
  "false": [[[1,2,3,4]], false],
  "true": [[[1,1,1,3,3,4,3,2,4,2]], true],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
