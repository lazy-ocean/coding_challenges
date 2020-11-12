const solution = require("./solution");

const tests = {
  "no one": [[[]], "no one likes this"],
  1: [[["Peter"]], "Peter likes this"],
  2: [[["Jacob", "Alex"]], "Jacob and Alex like this"],
  3: [[["Max", "John", "Mark"]], "Max, John and Mark like this"],
  4: [[["Alex", "Jacob", "Mark", "Max"]], "Alex, Jacob and 2 others like this"],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
