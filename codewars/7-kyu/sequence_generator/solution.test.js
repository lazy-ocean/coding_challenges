const solution = require("./solution");

const tests = {
  1: [
    [3, 4],
    [4, 4, 4],
  ],
  2: [
    [3, "s"],
    ["s", "s", "s"],
  ],
  3: [
    [5, []],
    [[], [], [], [], []],
  ],
  4: [
    [5, (x, idx) => idx % 2],
    [0, 1, 0, 1, 0],
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
