const solution = require("./solution");

expect(solution(1).toBe(1));
expect(solution(1)(2).toBe(3));
expect(solution(1)(2)(3).toBe(3));
