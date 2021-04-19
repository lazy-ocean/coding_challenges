const obj = require("./solution");

test("1", () => {
  expect(obj.hash("person.name")).toBe("joe");
});
test("2", () => {
  expect(obj.hash("person.history.bio")).toStrictEqual({
    funFact: "I like fishing.",
  });
});
test("3", () => {
  expect(obj.hash("person.history.homeStreet")).toBe(undefined);
});
test("4", () => {
  expect(obj.hash("person.animal.pet.needNoseAntEater")).toBe(undefined);
});
