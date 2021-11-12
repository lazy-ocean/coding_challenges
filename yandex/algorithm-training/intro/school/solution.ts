/* D. School
All houses in the village are located along one street on one side of it. There is nothing on the other side of this street yet, but soon everything will be - schools, stores, cinemas, etc.
To begin with, it was decided to build a school. It was decided to choose a construction place so that the total distance that students travel from their homes to the school was minimal.

The plan of the village can be represented as a straight line, at some integer points of which are the homes of the students. The school is also allowed to be built only at an integer point on that straight line (including allowing the school to be built at the point where one of the houses is located - because the school will be located on the other side of the street).

Your function should use the known coordinates of the students' houses to help determine the coordinates of where the school is to be built.

Input format
- N - the number of students (0 < N < 100001). 
Then follow, in strictly ascending order, the coordinates of the students' houses - integers that do not exceed 2 × 109 modulo.

Output format
Print a single integer - the coordinate of the point at which it is best to build a school. If there are several answers, print any of them.
*/

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
