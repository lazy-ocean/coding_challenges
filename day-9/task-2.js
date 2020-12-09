/* --- Day 9: Part Two ---
The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

Again consider the above example:
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.

What is the encryption weakness in your XMAS-encrypted list of numbers?
*/

const fs = require("fs");

let file = fs.readFileSync("day-9/data.txt", "utf8", (err, data) => {});
let input = file.split("\n");

let findSum = (arr) => {
  let length = arr.length;
  let searched = 22406676;
  for (let k = 0; k < length; k++) {
    let sum = ~~arr[k];
    let range = [~~arr[k]];
    for (let i = k + 1; i < length; i++) {
      sum += ~~arr[i];
      range.push(~~arr[i]);
      if (sum === searched) {
        let sorted = range.sort((a, b) => a - b);
        return sorted[0] + sorted[sorted.length - 1];
      }
      if (sum > searched) break;
    }
  }
  return false;
};

console.log(findSum(input));
