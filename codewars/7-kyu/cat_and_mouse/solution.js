/* https://www.codewars.com/kata/57f8842367c96a89dc00018e/train/javascript
You will be given a string (map) featuring a cat "C" and a mouse "m". The rest of the string will be made up of dots (".") The cat can move the given number of moves up, down, left or right, but not diagonally.

You need to find out if the cat can catch the mouse from it's current position and return "Caught!" or "Escaped!" respectively.

Finally, if one of two animals are not present, return "boring without two animals".
*/
const catMouse = (map, moves) => {
  const layers = map.split("\n");
  const coordinates = {
    C: [],
    m: [],
  };
  layers.forEach((layer, index) => {
    [...layer].forEach((item, ind) => {
      if (item === "C" || item === "m") {
        coordinates[item] = [index, ind];
      }
    });
  });
  if (!coordinates.C.length || !coordinates.m.length)
    return "boring without two animals";
  const diff =
    Math.abs(coordinates.m[0] - coordinates.C[0]) +
    Math.abs(coordinates.m[1] - coordinates.C[1]);
  return diff >= moves ? "Escaped!" : "Caught!";
};

const moves = 11;
const map = `....
C...
.m..
....
....
....
....
....
....
....`;

console.log(catMouse(map, moves));
module.exports = catMouse;
