const solution = require("./solution");

const tests = {
  1: [["A man, a plan, a canal: Panama"], true],
  2: [["race a car"], false],
  3: [["sator arepo tenet opera rotas"], true],
  4: [["Was it a car or a cat I saw?"], true],
  5: [[""], true],
  6: [["0P"], false],
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
