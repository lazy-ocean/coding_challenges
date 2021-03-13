const solution = require("./solution");

const tests = {
  1: [
    [3, 1],
    [1, 1, 1],
  ],
  2: [
    [2, "abc"],
    ["abc", "abc"],
  ],
  3: [["1", 1], [1]],
  4: [
    [3, solution(2, "2d")],
    [
      ["2d", "2d"],
      ["2d", "2d"],
      ["2d", "2d"],
    ],
  ],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
