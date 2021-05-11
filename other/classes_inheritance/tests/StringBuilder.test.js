const Base = require("../src/base");
const StringBuilder = require("../src/inheritanceClasses/StringBuilder");

let stringBuilder = null;
beforeEach(() => {
  stringBuilder = new StringBuilder("Hello");
});

test("init", () => {
  expect(stringBuilder.get()).toBe("Hello");
});

test("instance of Base", () => {
  expect(stringBuilder instanceof Base).toBeTruthy();
});

test("Base methods chaining", () => {
  expect(stringBuilder.plus("!").multiply(3).get()).toBe("Hello!Hello!Hello!");
});

test("Own methods chaining", () => {
  expect(stringBuilder.plus("!").multiply(3).remove("l").get()).toBe("Heo!Heo!Heo!");
});

test("Methods mix", () => {
  expect(stringBuilder.plus(" ").multiply(2).remove("H").plus("!").get()).toBe("ello ello !");
});
