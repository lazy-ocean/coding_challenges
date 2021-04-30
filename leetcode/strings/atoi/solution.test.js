const solution = require("./solution");

const tests = {
  1: [["42"], 42],
  2: [["    -42"], -42],
  3: [["4193 with words"], 4193],
  4: [["words and 987"], 0],
  5: [["-91283472332"], -2147483648],
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
