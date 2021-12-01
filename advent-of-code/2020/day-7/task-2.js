/*--- Day 7: Part Two ---
It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!
Consider again your shiny gold bag and the rules from the above example:

faded blue bags contain 0 other bags.
dotted black bags contain 0 other bags.
vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!
How many individual bags are required inside your single shiny gold bag?
*/

const fs = require("fs");
const _ = require("lodash");

let file = fs.readFileSync("day-7/data.txt", "utf8", (err, data) => {});
let input = file
  .split("\n")
  .map((line) => line.split(" contain "))
  .reduce((acc, line) => {
    let bag = line[0].slice(0, -5);
    let bags = line[1].slice(0, -1).split(", ");
    let res1 = bags.map((bg) => {
      if (bg[0] == 1) {
        return bg.slice(0, -4);
      } else {
        return bg.slice(0, -5);
      }
    });
    res2 = res1.reduce((acc, bag) => {
      let bg = bag.split(" ");
      [num, ...rest] = bg;
      acc[`${rest.join(" ")}`] = num;
      return acc;
    }, {});
    acc[bag] = res2;
    return acc;
  }, {});

const countBags = (input) => {
  const search = (node) => {
    let counter = 0;
    let innerBags = input[node];
    if (Object.keys(innerBags).includes("other")) {
      return 1;
    }

    Object.keys(innerBags).forEach((innerBag) => {
      counter += ~~innerBags[innerBag] * search(innerBag);
    });
    return counter + 1;
  };

  return search("shiny gold") - 1;
};
console.log(countBags(input));
