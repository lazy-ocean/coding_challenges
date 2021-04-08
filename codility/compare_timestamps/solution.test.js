const solution = require("./solution");

const tests = {
  "public test 1": [
    [1591786930, 1591795269],
    "2 hours, 18 minutes, 59 seconds",
  ],
  "public test 2": [[1591795209, 1591795269], "1 minute"],
  "public test 3": [[1592047284, 1591795269], "2 days, 22 hours, 15 seconds"],
  "0 sec": [[1, 1], "0 seconds"],
  "1 sec": [[0, 1], "1 second"],
  "1 min": [[0, 60], "1 minute"],
  "1 min 1 sec": [[0, 61], "1 minute, 1 second"],
  "2 min": [[0, 120], "2 minutes"],
  "1 hour": [[0, 3600], "1 hour"],
  "2 hours": [[0, 7200], "2 hours"],
  "1 day": [[0, 86400], "1 day"],
  "2 days": [[0, 172800], "2 days"],
  "21 of everything": [[0, 76881], "21 hours, 21 minutes, 21 seconds"],
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
