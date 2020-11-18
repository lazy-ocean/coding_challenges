const solution = require("./solution");

const tests = {
  test: ["test", "grfg"],
  "capital letter": ["Test", "Grfg"],
  meow: ["meow", "zrbj"],
  "11zero": ["11zero", "11mreb"],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
