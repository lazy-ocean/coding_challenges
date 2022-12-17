/* --- Part Two ---
Now, you just need to put all of the packets in the right order. Disregard the blank lines in your list of received packets.

The distress signal protocol also requires that you include two additional divider packets:

[[2]]
[[6]]
Using the same rules as before, organize all packets - the ones in your list of received packets as well as the two divider packets - into the correct order.

For the example above, the result of putting the packets in the correct order is:

[]
[[]]
[[[]]]
[1,1,3,1,1]
[1,1,5,1,1]
[[1],[2,3,4]]
[1,[2,[3,[4,[5,6,0]]]],8,9]
[1,[2,[3,[4,[5,6,7]]]],8,9]
[[1],4]
[[2]]
[3]
[[4,4],4,4]
[[4,4],4,4,4]
[[6]]
[7,7,7]
[7,7,7,7]
[[8,7,6]]
[9]
Afterward, locate the divider packets. To find the decoder key for this distress signal, you need to determine the indices of the two divider packets and multiply them together. (The first packet is at index 1, the second packet is at index 2, and so on.) In this example, the divider packets are 10th and 14th, and so the decoder key is 140.

Organize all of the packets into the correct order. What is the decoder key for the distress signal?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-13/data.txt",
  "utf8",
  () => null
);

const input = dataset
  .split("\n")
  .filter(Boolean)
  .map((it) => JSON.parse(it));

const comparePair = (
  firstP: (number | number[])[],
  secondP: (number | number[])[]
): number => {
  const first = [...firstP];
  const second = [...secondP];
  while (first.length > 0) {
    if (!second.length) return -1;
    const f = first.shift();
    const s = second.shift();
    if (typeof f === "number" && typeof s === "number") {
      if (f !== s) return f < s ? 1 : -1;
    } else {
      const isOrdered = comparePair(
        Array.isArray(f) ? f : [f],
        Array.isArray(s) ? s : [s]
      );
      if (isOrdered !== 0) {
        return isOrdered;
      }
    }
  }
  if (!second.length) return 0;

  return 1;
};

const findRightOrderPairs = (data: number[][]): number => {
  const newData = [...data, [[2]], [[6]]];
  const sorted = newData.sort((a, b) => comparePair(b, a));

  const i =
    sorted.findIndex(
      (item: number[][]) =>
        item.flat(Infinity).length === 1 && item.flat(Infinity)[0] === 2
    ) + 1;
  const j =
    sorted.findIndex(
      (item: number[][]) =>
        item.flat(Infinity).length === 1 && item.flat(Infinity)[0] === 6
    ) + 1;
  return i * j;
};

console.log(findRightOrderPairs(input));
