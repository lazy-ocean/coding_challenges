const solution = require("./solution");

const suspects1 = {
  James: ["Jacob", "Bill", "Lucas"],
  Johnny: ["David", "Kyle", "Lucas"],
  Peter: ["Lucy", "Kyle"],
};
const dead1 = ["Lucas", "Bill"];

const suspects2 = { Brad: [], Megan: ["Ben", "Kevin"], Finn: [] };
const dead2 = ["Ben"];

const tests = {
  1: [[suspects1, dead1], "James"],
  2: [[suspects2, dead2], "Megan"],
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
