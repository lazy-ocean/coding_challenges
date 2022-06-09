const solution = require("./solution2");

const tests = {
  "2 + 4 = 6": [
    [[3, 2, 4], 6],
    [1, 2],
  ],
  "3 + 3 = 6": [
    [[3, 3], 6],
    [0, 1],
  ],
  "3 + 7 = 10": [
    [[3, 2, 7], 10],
    [0, 2],
  ],
  "12 + 5 = 17": [
    [[3, 2, 1, 9, 12, 4, 5], 17],
    [4, 6],
  ],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args).sort()).toStrictEqual(tests[testKey][1])
      : expect(solution(args).sort()).toStrictEqual(tests[testKey][1]);
  });
});
