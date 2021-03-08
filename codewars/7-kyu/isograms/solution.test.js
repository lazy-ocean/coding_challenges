const solution = require("./solution");

const tests = {
  1: [["Dermatoglyphics"], true],
  2: [["isogram"], true],
  3: [["aba"], false],
  4: [["moOse"], false],
  5: [["isIsogram"], false],
  6: [[""], true],
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
