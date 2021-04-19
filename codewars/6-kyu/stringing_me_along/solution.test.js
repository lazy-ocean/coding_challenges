const solution = require("./solution");

test("1", () => {
  expect(solution("meow")("meow")("meow")()).toBe("meow meow meow");
});
test("2", () => {
  expect(solution("1")("1")()).toBe("1 1");
});
test("3", () => {
  expect(solution("How")("do")("you")("do")("?")()).toBe("How do you do ?");
});
