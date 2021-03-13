const solution = require("./solution");

const tests = {
  1: [["Hello"], 1],
  2: [["Hello, World!"], 2],
  3: [
    [
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    19,
  ],
  4: [["With! Symbol@ #Around! (Every) %Word$"], 5],
  5: [["Dear   Victoria, I love  to press   space button."], 8],
  6: [[" Arthur "], 1],
  7: [[" David"], 1],
  8: [["  Hello Gomer  "], 2],
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
