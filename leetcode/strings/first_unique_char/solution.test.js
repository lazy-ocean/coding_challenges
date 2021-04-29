const solution = require("./solution");

const tests = {
  1: [["leetcode"], 0],
  2: [["loveleetcode"], 2],
  3: [["aabb"], -1],
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
