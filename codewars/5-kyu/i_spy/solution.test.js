const spyOn = require("./solution");

function adder(n1, n2) {
  return n1 + n2;
}
const adderSpy = spyOn(adder);

test("test", () => {
  expect(adderSpy(2, 4)).toBe(6);
  expect(adderSpy(3, 5)).toBe(8);
  expect(adderSpy.callCount()).toBe(2);
  expect(adderSpy.wasCalledWith(4)).toBeTruthy();
  expect(adderSpy.wasCalledWith(0)).toBeFalsy();
  expect(adderSpy.returned(8)).toBeTruthy();
  expect(adderSpy.returned(0)).toBeFalsy();
});
