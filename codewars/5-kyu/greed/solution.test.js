const solution = require("./solution");

const tests = {
  "should value this as worthless": [[[2, 3, 4, 6, 2]], 0],
  "should value this triplet correctly": [[[4, 4, 4, 3, 3]], 400],
  "should value this mixed set correctly": [[[2, 4, 4, 5, 4]], 450],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
