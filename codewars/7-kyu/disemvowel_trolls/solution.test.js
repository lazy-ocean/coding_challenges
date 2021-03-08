const solution = require("./solution");

const tests = {
  1: [["This website is for losers LOL!"], "Ths wbst s fr lsrs LL!"],
  2: [["meow"], "mw"],
  3: [
    ["Trolls are attacking your comment section!"],
    "Trlls r ttckng yr cmmnt sctn!",
  ],
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
