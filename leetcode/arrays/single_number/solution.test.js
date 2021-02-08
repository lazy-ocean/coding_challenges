const solution = require("./solution");

const tests = {
  "1": [[[2,2,1]], 1],
  "4": [[[4,1,2,1,2]], 4],
  "one num": [[[1]], 1],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
