/*--- Day 7: Handy Haversacks ---
You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

For example, consider the following rules:

light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

In the above rules, the following options would be available to you:

A bright white bag, which can hold your shiny gold bag directly.
A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)
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
    let res = bags.map((bg) => {
      if (bg[0] == 1) {
        return bg.slice(2, -4);
      } else {
        return bg.slice(2, -5);
      }
    });
    acc[bag] = res;
    return acc;
  }, {});

const countBags = (input) => {
  let list = new Set();
  let stack = [];

  const search = (node) => {
    let innerBags = input[node];
    if (innerBags[0] === " other") return;

    if (innerBags) {
      if (innerBags.some((bag) => bag === "shiny gold")) {
        if (stack.length)
          stack.forEach((item) => {
            list.add(item);
          });
        list.add(node);
      } else {
        stack.push(node);
        innerBags.forEach((bag) => search(bag, node));
        stack.pop();
      }
    }
  };

  Object.keys(input).forEach((key) => {
    stack = [];
    search(key);
  });
  return list.size;
};
console.log(countBags(input));
