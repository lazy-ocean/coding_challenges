const solution = require("./solution.ts");

const tests = {
  1: [["boo", "obb"], false],
  2: [["qwerty", "ytrewq"], true],
  3: [["gogogog", "ggggooo"], true],
  4: [["as", "ae"], false],
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
