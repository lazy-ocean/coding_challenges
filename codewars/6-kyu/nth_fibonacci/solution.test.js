const solution = require("./solution");

const tests = {
  "1st": [[1], 0],
  "2nd": [[2], 1],
  "3rd": [[3], 1],
  "4th": [[4], 2],
  "5th": [[5], 3],
  "6th": [[6], 5],
  "7th": [[7], 8],
  "8th": [[8], 13],
  "9th": [[9], 21],
  "10th": [[10], 34],
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
