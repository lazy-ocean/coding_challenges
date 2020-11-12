const solution = require("./solution");

const tests = {
  1: [
    [
      ["xyz", "live", "strong"],
      ["lively", "alive", "harp", "sharp", "armstrong"],
    ],
    ["live", "strong"],
  ],
  2: [
    [
      ["live", "strong", "arp"],
      ["lively", "alive", "harp", "sharp", "armstrong"],
    ],
    ["arp", "live", "strong"],
  ],
  3: [
    [
      ["tarp", "mice", "bull"],
      ["lively", "alive", "harp", "sharp", "armstrong"],
    ],
    [],
  ],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toEqual(tests[testKey][1])
      : expect(solution(args)).toEqual(tests[testKey][1]);
  });
});
