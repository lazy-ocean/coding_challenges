const solution = require("./solution");

const tests = {
  "number 1": [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]], "(123) 456-7890"],
  "number 2": [[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], "(111) 111-1111"],
  "number 3": [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]], "(123) 456-7890"],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
