const solution = require("./solution");

const tests = {
  1: [["ABC"], 6],
  2: [["abcdef"], 6],
  3: [["ifkhchlhfd"], 6],
  4: [["aaaaaddddr"], 30],
  5: [["abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"], 96],
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
