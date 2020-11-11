const solution = require("./solution");

const tests = {
  "test 1": ["4556364607935616", "############5616"],
  "test 2": ["1", "1"],
  "test 3": ["11111", "#1111"],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
