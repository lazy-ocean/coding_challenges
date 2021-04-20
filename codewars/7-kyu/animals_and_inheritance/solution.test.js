const { Cat, Dog, Shark } = require("./solution");

test("cat", () => {
  const cat = new Cat("cat", 7, "Playing with a ball of yarn");
  expect(cat.name).toBe("cat");
  expect(cat.age).toBe(7);
  expect(cat.legs).toBe(4);
  expect(cat.species).toBe("cat");
  expect(cat.status).toBe("Playing with a ball of yarn");
  expect(cat.introduce()).toBe(
    "Hello, my name is cat and I am 7 years old.  Meow meow!"
  );
});

test("dog", () => {
  const dog = new Dog("Doug", 12, "Serving his master", "Eliza");
  expect(dog.name).toBe("Doug");
  expect(dog.age).toBe(12);
  expect(dog.legs).toBe(4);
  expect(dog.species).toBe("dog");
  expect(dog.status).toBe("Serving his master");
  expect(dog.introduce()).toBe("Hello, my name is Doug and I am 12 years old.");
  expect(dog.greetMaster()).toBe("Hello Eliza");
});

test("shark", () => {
  const shark = new Shark("Billy", 3, "Alive and well");
  expect(shark.name).toBe("Billy");
  expect(shark.age).toBe(3);
  expect(shark.legs).toBe(0);
  expect(shark.species).toBe("shark");
  expect(shark.status).toBe("Alive and well");
  expect(shark.introduce()).toBe(
    "Hello, my name is Billy and I am 3 years old."
  );
});
