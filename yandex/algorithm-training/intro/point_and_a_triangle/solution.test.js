const solution = require("./solution.ts");

const tests = {
  "point inside triangle": [[5, [1, 1]], 0],
  "point outside triangle": [[3, [-1, -1]], 1],
  "point outside triangle 2": [[4, [4, 4]], 2],
  "point on the side": [[4, [2, 2]], 0],
  "point outside -x": [[10, [-3, 0]], 1],
  "point outside +y": [[10, [0, 15]], 3],
  "point outside +x": [[10, [15, 0]], 2],
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
