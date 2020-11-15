const solution = require("./solution");

const tests = {
  "test 1": ["Pig latin is cool", "igPay atinlay siay oolcay"],
  "hello world": ["Hello world !", "elloHay orldway !"],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
