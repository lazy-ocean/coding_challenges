const solution = require("./solution");

const tests = {
  "test 1": [
    [["zone", "abigail", "theta", "form", "libe", "zas"], 2],
    "abigailtheta",
  ],
  "test 2": [
    [
      [
        "ejjjjmmtthh",
        "zxxuueeg",
        "aanlljrrrxx",
        "dqqqaaabbb",
        "oocccffuucccjjjkkkjyyyeehh",
      ],
      1,
    ],
    "oocccffuucccjjjkkkjyyyeehh",
  ],
  empty: [[[], 3], ""],
  "test 3": [
    [
      [
        "itvayloxrp",
        "wkppqsztdkmvcuwvereiupccauycnjutlv",
        "vweqilsfytihvrzlaodfixoyxvyuyvgpck",
      ],
      2,
    ],
    "wkppqsztdkmvcuwvereiupccauycnjutlvvweqilsfytihvrzlaodfixoyxvyuyvgpck",
  ],
  "test 4": [
    [["wlwsasphmxx", "owiaxujylentrklctozmymu", "wpgozvxxiu"], 2],
    "wlwsasphmxxowiaxujylentrklctozmymu",
  ],
  "test 5 wrong arg": [
    [["zone", "abigail", "theta", "form", "libe", "zas"], -2],
    "",
  ],
  "test 6": [
    [["it", "wkppv", "ixoyx", "3452", "zzzzzzzzzzzz"], 3],
    "ixoyx3452zzzzzzzzzzzz",
  ],
  "test 7 wrong arg": [
    [["it", "wkppv", "ixoyx", "3452", "zzzzzzzzzzzz"], 15],
    "",
  ],
  "test 8 wrong arg": [
    [["it", "wkppv", "ixoyx", "3452", "zzzzzzzzzzzz"], 0],
    "",
  ],
};

Object.keys(tests).forEach((testKey) => {
  let args = tests[testKey][0];
  test(testKey, () => {
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
