/*
--- Day3: Part Two ---
Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?
*/
const field = require("./field.js");

let paths = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

function func(arr, path) {
  let trees = 0;
  let i = path[0] - 1;
  for (let l = path[1]; l <= arr.length - 1; l += path[1]) {
    if (i >= 30) i = i - 31;
    if (arr[l][0][i + 1] === "#") trees += 1;
    i += path[0];
  }
  return trees;
}

let main = (func, paths) => {
  let answers = [];
  paths.forEach((path) => {
    let trees = func(field, path);
    answers.push(trees);
  });
  return answers.reduce((acc, item) => (acc *= item), 1);
};

console.log(main(func, paths));
