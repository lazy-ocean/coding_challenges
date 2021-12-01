/*--- Day 23: Crab Cups ---
The small crab challenges you to a game! The crab is going to mix up some cups, and you have to predict where they'll end up.

The cups will be arranged in a circle and labeled clockwise (your puzzle input). For example, if your labeling were 32415, there would be five cups in the circle; going clockwise around the circle from the first cup, the cups would be labeled 3, 2, 4, 1, 5, and then back to 3 again.

Before the crab starts, it will designate the first cup in your list as the current cup. The crab is then going to do 100 moves.

Each move, the crab does the following actions:

The crab picks up the three cups that are immediately clockwise of the current cup. They are removed from the circle; cup spacing is adjusted as necessary to maintain the circle.
The crab selects a destination cup: the cup with a label equal to the current cup's label minus one. If this would select one of the cups that was just picked up, the crab will keep subtracting one until it finds a cup that wasn't just picked up. If at any point in this process the value goes below the lowest value on any cup's label, it wraps around to the highest value on any cup's label instead.
The crab places the cups it just picked up so that they are immediately clockwise of the destination cup. They keep the same order as when they were picked up.
The crab selects a new current cup: the cup which is immediately clockwise of the current cup.

In the above example, the cups' values are the labels as they appear moving clockwise around the circle; the current cup is marked with ( ).

After the crab is done, what order will the cups be in? Starting after the cup labeled 1, collect the other cups' labels clockwise into a single string with no extra characters; each number except 1 should appear exactly once. In the above example, after 10 moves, the cups clockwise from 1 are labeled 9, 2, 6, 5, and so on, producing 92658374. If the crab were to complete all 100 moves, the order after cup 1 would be 67384529.

Using your labeling, simulate 100 moves. What are the labels on the cups after cup 1?
*/

const _ = require("lodash");

let test = "389125467".split("").map((num) => ~~num);
let data = "418976235".split("").map((num) => ~~num);

const game = (input) => {
  let rounds = 1;
  while (rounds <= 100) {
    let currentCup = input[0];
    let pickUp = input.splice(1, 3);
    let search = currentCup - 1;
    let destination = null;
    while (!destination) {
      destination = input.find((item) => search === item);
      if (!destination) search -= 1;
      if (search < 1) destination = _.max(input);
    }
    let insertIndex = input.indexOf(destination);
    input.splice(insertIndex + 1, 0, ...pickUp);
    input.push(input.shift());
    rounds += 1;
  }
  let i = input.indexOf(1);

  return [...input.slice(i + 1), ...input.slice(0, i)].join("");
};
console.log(game(data));
