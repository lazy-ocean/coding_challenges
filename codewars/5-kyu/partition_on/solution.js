/* https://www.codewars.com/kata/525a037c82bf42b9f800029b/train/javascript
Write a function which partitions a list of items based on a given predicate.
After the partition function is run, the list should be of the form [ F, F, F, T, T, T ] where the Fs (resp. Ts) are items for which the predicate function returned false (resp. true).
NOTE: the partitioning should be stable; in other words: the ordering of the Fs (resp. Ts) should be preserved relative to each other.
For convenience and utility, the partition function should return the boundary index. In other words: the index of the first T value in items.
*/
const partitionOn = (pred, items) => {
  const truthy = items.filter(pred);
  const falshy = items.filter((item) => !pred(item));
  const newItems = [...falshy, ...truthy];
  changeItems(items, newItems);
  const index = items.findIndex((i) => pred(i));
  return index;
};

const changeItems = (items, newItems) => {
  for (let i = 0; i < items.length; i++) {
    items[i] = newItems[i];
  }
};

const items = [1, 2, 3, 4, 5, 6];
const isEven = (n) => n % 2 === 0;
console.log(partitionOn(isEven, items));
module.exports = partitionOn;
