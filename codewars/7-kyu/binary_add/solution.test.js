const solution = require("./solution");

const tests = {
  "adds 1 + 2": [[1, 2], "11"],
  "adds 10 + 15": [[10, 15], "11001"],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
