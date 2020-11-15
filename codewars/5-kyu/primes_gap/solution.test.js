const solution = require("./solution");

//prettier-ignore
const tests = {
  101: [[2, 100, 110], [101, 103]],
  103: [[4, 100, 110], [103, 107]],
  wrong: [[6, 100, 110], null],
  359: [[8, 300, 400], [359, 367]],
  337: [[10, 300, 400], [337, 347]],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
