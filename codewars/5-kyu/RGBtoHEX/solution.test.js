const solution = require("./solution");

const tests = {
  0: [[0, 0, 0], "000000"],
  "wrong arg": [[0, 0, -20], "000000"],
  2: [[300, 255, 255], "FFFFFF"],
  3: [[173, 255, 47], "ADFF2F"],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
