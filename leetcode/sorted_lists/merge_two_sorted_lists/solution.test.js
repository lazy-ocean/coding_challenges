const solution = require("./solution");

const tests = {
  1: [
    [
      {
        val: 1,
        next: { val: 2, next: { val: 3, next: { val: 4, next: null } } },
      },
      { val: 1, next: { val: 3, next: { val: 4, next: null } } },
    ],
    {
      val: 1,
      next: {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
            next: { val: 3, next: { val: 4, next: { val: 4, next: null } } },
          },
        },
      },
    },
  ],
  2: [
    [
      {
        val: 1,
        next: { val: 2, next: { val: 3, next: { val: 5, next: null } } },
      },
      { val: 1, next: { val: 3, next: { val: 4, next: null } } },
    ],
    {
      next: {
        next: {
          next: {
            next: { next: { next: { next: null, val: 5 }, val: 4 }, val: 3 },
            val: 3,
          },
          val: 2,
        },
        val: 1,
      },
      val: 1,
    },
  ],
  3: [
    [
      {
        val: 1,
        next: { val: 1, next: { val: 2, next: { val: 5, next: null } } },
      },
      { val: 3, next: { val: 4, next: null } },
    ],
    {
      next: {
        next: {
          next: { next: { next: { next: null, val: 5 }, val: 4 }, val: 3 },
          val: 2,
        },
        val: 1,
      },
      val: 1,
    },
  ],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toEqual(tests[testKey][1])
      : expect(solution(args)).toEqual(tests[testKey][1]);
  });
});
