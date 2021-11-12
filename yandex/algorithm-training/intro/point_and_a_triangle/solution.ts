/* E. A point and a triangle 
On the coordinate plane there is a triangle ABC with length of the verticles d, and a separate point X. The verticles of the triangle lie on the coordinate axes, and the edges are located at the points: A (0,0), B (d,0), C (0,d).

Write a function that determines the relative position of point X to the triangle. If point X is inside or on the verticles of the triangle, print 0. If the point is outside the triangle, print the number of the edge closest to it.

Input format
n - a natural number d (not exceeding 1000)
x, y - coordinates of point X - two integers in range from -1000 to 1000.

Output format
If the point is inside, or on a side of triangle or coincides with one of its vertices, print 0. If the point is outside of triangle, print the number of the closest edge (1 - to edge A, 2 - to B, 3 - to C). If the point is situated at the same distance from two vertices, output the edge whose number is smaller.
*/

export {};
const fs = require("fs");

const input = fs.readFileSync(
  "point_and_a_triangle/input.txt",
  "utf8",
  () => null
);
const data = input.split("\n");
const sideLength = Number(data[0]);
const pointCoordinates = data[1].split(" ").map((item: string) => Number(item));

type Point = [number, number];

const whereIsThePoint = (length: number, point: Point): number => {
  const [x, y] = point;
  const squareCalc = ([x1, y1], [x2, y2], [x3, y3]) =>
    Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
  const coordinates: [Point, Point, Point] = [
    [0, 0],
    [length, 0],
    [0, length],
  ];
  const mainSquare = squareCalc(...coordinates);
  const firstSubTrSq = squareCalc([0, 0], coordinates[1], point);
  const secondSubTrSq = squareCalc([0, 0], point, coordinates[2]);
  const thirdSubTrSq = squareCalc(point, coordinates[1], coordinates[2]);
  if (firstSubTrSq + secondSubTrSq + thirdSubTrSq === mainSquare) return 0;
  const distances = coordinates.map(
    ([trX, trY]) => Math.abs(trX - x) + Math.abs(trY - y)
  );
  return distances.indexOf(Math.min(...distances)) + 1;
};

const result = whereIsThePoint(sideLength, pointCoordinates);
console.log(result);
/* fs.writeFileSync("output.txt", result.toString()) */
module.exports = whereIsThePoint;
