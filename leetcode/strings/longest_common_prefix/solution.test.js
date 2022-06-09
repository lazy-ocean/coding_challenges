const solution = require("./solution");

const tests = {
  1: [[["flower", "flow", "flight"]], "fl"],
  2: [[["flower", "flow", "flight", "f"]], "f"],
  3: [[["flower"]], "flower"],
  4: [[[]], ""],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
