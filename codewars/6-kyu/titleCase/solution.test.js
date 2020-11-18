const solution = require("./solution");

const tests = {
  empty: ["", ""],
  1: [["a clash of KINGS", "a an the of"], "A Clash of Kings"],
  2: [["THE WIND IN THE WILLOWS", "The In"], "The Wind in the Willows"],
  3: [["the quick brown fox"], "The Quick Brown Fox"],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
