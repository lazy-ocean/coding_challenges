/* https://www.codewars.com/kata/54566695309908a6590005f1/train/javascript
Make a function called crossProduct that takes two 3 dimensional vectors (in the form of two arrays) and returns their cross product. You need to check if the passed arguments are of the expected format, otherwise throw the message: "Arguments are not 3D vectors!".
*/

const crossProduct = (a, b) => {
  if (!a || !b || a.length !== 3 || b.length !== 3) {
    throw new Error("Arguments are not 3D vectors!");
  }
  const i = a[1] * b[2] - a[2] * b[1];
  const j = a[0] * b[2] - a[2] * b[0];
  const k = a[0] * b[1] - a[1] * b[0];
  return [i, 0 - j, k];
};

console.log(crossProduct([1, 0, 0], [0, 1, 0]));
module.exports = crossProduct;
