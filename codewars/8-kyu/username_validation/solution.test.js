const solution = require("./solution");

const tests = {
  1: [["asddsa"], true],
  2: [["a"], false],
  3: [["Hass"], false],
  4: [["Hasd_12assssssasasasasasaasasasasas"], false],
  5: [[""], false],
  6: [["____"], true],
  7: [["012"], false],
  8: [["p1pp1"], true],
  9: [["asd43 34"], false],
  10: [["asd43_34"], true],
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
