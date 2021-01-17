const solution = require("./solution");

const tests = {
  "2 + 7 = 9": [
    [[2, 7, 11, 15], 9],
    [0, 1],
  ],
  "2 + 4 = 6": [
    [[3, 2, 4], 6],
    [1, 2],
  ],
  "3 + 3 = 6": [
    [[3, 3], 6],
    [0, 1],
  ],
  "9 + 1 = 10": [
    [[0, 3, 5, 6, 1, 9], 10],
    [4, 5],
  ],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
