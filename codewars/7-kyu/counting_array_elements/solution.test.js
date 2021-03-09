const solution = require("./solution");

const tests = {
  1: [[["james", "james", "john"]], { james: 2, john: 1 }],
  2: [[["a", "a", "b", "b", "b"]], { a: 2, b: 3 }],
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
