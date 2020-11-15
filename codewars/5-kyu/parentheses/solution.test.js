const solution = require("./solution");

const tests = {
  "simple pair": ["()", true],
  "invalid many": [")(()))", false],
  "simple pair": ["()", true],
  "many pairs": ["(())((()())())", true],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
