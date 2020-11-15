/* https://www.codewars.com/kata/52597aa56021e91c93000cb0/train/javascript
Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.
*/

function moveZeros(arr) {
  let zeros = [];
  let nonZeros = [];
  arr.map((item) => {
    item === 0 ? zeros.push(item) : nonZeros.push(item);
  });
  return [...nonZeros, ...zeros];
}

console.log(moveZeros([false, 1, 0, 1, 2, 0, 1, 3, "a"]));
module.exports = moveZeros;
