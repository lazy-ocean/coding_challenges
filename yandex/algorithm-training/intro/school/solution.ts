export {};
const fs = require("fs");

const input = fs.readFileSync("school/input.txt", "utf8", () => null);
const data = input.split("\n");
const people = Number(data[0]);
const house = data[1].split(" ").map((item: string) => Number(item));

const placeSchool = (students: number, houses: number[]) =>
  houses[Math.floor(students / 2)];

const result = placeSchool(people, house);
console.log(result);
/* fs.writeFileSync("output.txt", result.toString()) */
module.exports = placeSchool;
