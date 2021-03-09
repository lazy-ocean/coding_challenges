/* https://www.codewars.com/kata/5884d46015a70f6cd7000035/train/javascript
Create function inter getting 2 sets as arguments and returning a new Set as result of intersection of these 2 sets.
*/

const intersection = (set1, set2) =>
  new Set([...set1].filter((item) => set2.has(item)));

const A = new Set([1, 2]);
const B = new Set([2, 3]);
console.log(intersection(A, B));
module.exports = intersection;
