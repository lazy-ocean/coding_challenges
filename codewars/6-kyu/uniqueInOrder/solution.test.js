const solution = require("./solution");

const tests = {
  letters: ["AAAABBBCCDAABBB", ["A", "B", "C", "D", "A", "B"]],
  letters2: ["ABBCcAD", ["A", "B", "C", "c", "A", "D"]],
  numbers_arr: [[[1, 2, 2, 3, 3]], [1, 2, 3]],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
