const { Cuboid, Cube } = require("./solution");

test("Cuboid", () => {
  const cuboid = new Cuboid(1, 2, 3);
  expect(cuboid.length).toBe(1);
  expect(cuboid.width).toBe(2);
  expect(cuboid.height).toBe(3);
  expect(cuboid.volume).toBe(6);
  expect(cuboid.surfaceArea).toBe(22);
  cuboid.length = 4;
  expect(cuboid.volume).toBe(24);
  expect(cuboid.surfaceArea).toBe(52);
  cuboid.width = 5;
  expect(cuboid.volume).toBe(60);
  expect(cuboid.surfaceArea).toBe(94);
  cuboid.height = 6;
  expect(cuboid.volume).toBe(120);
  expect(cuboid.surfaceArea).toBe(148);
  [cuboid.length, cuboid.width, cuboid.height] = [7, 8, 9];
  expect(cuboid.volume).toBe(504);
  expect(cuboid.surfaceArea).toBe(382);
});

test("Cube", () => {
  const cube = new Cube(1);
  expect(cube.length).toBe(1);
  expect(cube.width).toBe(1);
  expect(cube.height).toBe(1);
  expect(cube.volume).toBe(1);
  expect(cube.surfaceArea).toBe(6);
  cube.length = cube.width = cube.height = 2;
  expect(cube.volume).toBe(8);
  expect(cube.surfaceArea).toBe(24);
  cube.length = cube.width = cube.height = 3;
  expect(cube.volume).toBe(27);
  expect(cube.surfaceArea).toBe(54);
  cube.length = cube.width = cube.height = 5;
  expect(cube.volume).toBe(125);
  expect(cube.surfaceArea).toBe(150);
  cube.length = cube.width = cube.height = 10;
  expect(cube.volume).toBe(1000);
  expect(cube.surfaceArea).toBe(600);
});
