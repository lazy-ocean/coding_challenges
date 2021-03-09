const solution = require("./solution");

const tests = {
  1: [["Username123"], "VALID"],
  2: [["Username"], "INVALID"],
  3: [["1Username"], "VALID"],
  4: [["123"], "INVALID"],
  5: [["a12"], "INVALID"],
  6: [["Username123!"], "INVALID"],
  7: [["ThisPasswordIsTooLong1234"], "INVALID"],
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
