const solution = require("./solution");

const tests = {
  "test 1": [[[1,2,2,1], [2,2]], [2,2]],
  "test 2": [[[4,9,5], [9,4,9,8,4]], [4,9]],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toEqual(tests[testKey][1])
      : expect(solution(args)).toEqual(tests[testKey][1]);
  });
});
