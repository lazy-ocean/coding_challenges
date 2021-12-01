const solution = require("./solution.ts");

const tests = {
  "one letter": [["a"], 0],
  "two letters": [["ab"], 1],
  example: [["cognitive"], 4],
  palindrome: [["madam"], 0],
  "palindrome 2": [["deified"], 0],
  random: [["random"], 3],
  "long word": [["destructurization"], 7],
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
