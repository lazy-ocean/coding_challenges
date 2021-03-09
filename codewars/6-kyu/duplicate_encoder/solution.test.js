const solution = require("./solution");

const tests = {
  "not repeated": [["din"], "((("],
  mixed: [["recede"], "()()()"],
  "ignore case": [["Success"], ")())())"],
  symbols: [["(( @"], "))(("],
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
