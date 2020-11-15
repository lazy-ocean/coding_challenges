const solution = require("./solution");

const tests = {
  "test 1": [
    [[false, 1, 0, 1, 2, 0, 1, 3, "a"]],
    [false, 1, 1, 2, 1, 3, "a", 0, 0],
  ],
  "test 2": [[["m", 0, 0, 1, 0, 1, 1]], ["m", 1, 1, 1, 0, 0, 0]],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
