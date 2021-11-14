/* 2.B. Shops and houses
Ten buildings were built in a row on a street. Each building could be either an apartment building, a store, or an office building.
But it turned out that residents of some houses have to walk too far to the nearest store. To develop a plan for public transportation, the mayor asked you to find out what is the longest distance residents have to walk from their home to the nearest store.

Input format
Ten numbers separated by spaces. Each number specifies the type of building: 1 - a house, 2 - a store, 0 - an office building. It is guaranteed that there is at least one residential building and at least one store.

Output format
Print a single integer: the greatest distance from the house to the nearest store. The distance between two neighboring houses is considered equal to 1 (that is, if two houses stand next to each other, the distance between them is 1, if there is another house between two houses, the distance between them is 2, etc.)
*/

/* eslint no-shadow: "warn" */
export {};
const fs = require("fs");

const input = fs.readFileSync("shops_and_houses/input.txt", "utf8", () => null);

const data: number[] = input
  .toString()
  .split(" ")
  .map((item: string) => Number(item));

enum BuildingsTypes {
  office = 0,
  house = 1,
  shop = 2,
}

const countDistance = (buildings: number[]) => {
  let distance = 0;
  const shops: number[] = [];
  buildings.forEach((b, i) => {
    if (b === BuildingsTypes.shop) shops.push(i);
  });
  buildings.forEach((b, i) => {
    if (b === BuildingsTypes.house) {
      const houseDistance = Math.min(
        ...shops.map((shop) => Math.abs(i - shop))
      );
      if (houseDistance > distance) distance = houseDistance;
    }
  });
  return distance;
};

const result = countDistance(data);
console.log(result);
/* fs.writeFileSync("shops_and_houses/output.txt", result.toString()) */
module.exports = countDistance;
