const solution = require("./solution");

const tests = {
  1: [
    [
      {
        val: 1,
        left: { val: 2, left: null, right: null },
        right: { val: 3, left: null, right: null },
      },
    ],
    {
      val: 1,
      left: { val: 3, left: null, right: null },
      right: { val: 2, left: null, right: null },
    },
  ],
  2: [
    [
      {
        val: 1,
        left: {
          val: 2,
          left: { val: 4, left: null, right: null },
          right: null,
        },
        right: {
          val: 3,
          left: null,
          right: { val: 5, left: null, right: null },
        },
      },
    ],
    {
      val: 1,
      left: {
        val: 3,
        left: { val: 5, left: null, right: null },
        right: null,
      },
      right: {
        val: 2,
        left: null,
        right: { val: 4, left: null, right: null },
      },
    },
  ],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toStrictEqual(tests[testKey][1])
      : expect(solution(args)).toStrictEqual(tests[testKey][1]);
  });
});
