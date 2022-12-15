/* eslint-disable no-unused-expressions */
/* --- Day 11: Monkey in the Middle ---
As you finally start making your way upriver, you realize your pack is much lighter than you remember. Just then, one of the items from your pack goes flying overhead. Monkeys are playing Keep Away with your missing things!

To get your stuff back, you need to be able to predict where the monkeys will throw your items. After some careful observation, you realize the monkeys operate based on how worried you are about each item.

You take some notes (your puzzle input) on the items each monkey currently has, how worried you are about those items, and how the monkey makes decisions based on your worry level. For example:

Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
Each monkey has several attributes:

Starting items lists your worry level for each item the monkey is currently holding in the order they will be inspected.
Operation shows how your worry level changes as that monkey inspects an item. (An operation like new = old * 5 means that your worry level after the monkey inspected the item is five times whatever your worry level was before inspection.)
Test shows how the monkey uses your worry level to decide where to throw an item next.
If true shows what happens with an item if the Test was true.
If false shows what happens with an item if the Test was false.
After each monkey inspects an item but before it tests your worry level, your relief that the monkey's inspection didn't damage the item causes your worry level to be divided by three and rounded down to the nearest integer.

The monkeys take turns inspecting and throwing items. On a single monkey's turn, it inspects and throws all of the items it is holding one at a time and in the order listed. Monkey 0 goes first, then monkey 1, and so on until each monkey has had one turn. The process of each monkey taking a single turn is called a round.

When a monkey throws an item to another monkey, the item goes on the end of the recipient monkey's list. A monkey that starts a round with no items could end up inspecting and throwing many items by the time its turn comes around. If a monkey is holding no items at the start of its turn, its turn ends.

Chasing all of the monkeys at once is impossible; you're going to have to focus on the two most active monkeys if you want any hope of getting your stuff back. Count the total number of times each monkey inspects items over 20 rounds:

Monkey 0 inspected items 101 times.
Monkey 1 inspected items 95 times.
Monkey 2 inspected items 7 times.
Monkey 3 inspected items 105 times.
In this example, the two most active monkeys inspected items 101 and 105 times. The level of monkey business in this situation can be found by multiplying these together: 10605.

Figure out which monkeys to chase by counting how many items they inspect over 20 rounds. What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-11/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n");
// eslint-disable-next-line no-new-func, prefer-template
const notEval = (fn) => new Function("return " + fn)();

const parseInput = (data: string[]) => {
  const monkeys = {};
  let currentMonkey = {
    items: null,
    op: null,
    test: null,
    truthy: null,
    falshy: null,
    inspected: 0,
  };
  let currInd = "";
  data.forEach((line) => {
    const [st, ...rest] = line.trim().split(" ");
    switch (st) {
      case "Monkey":
        currInd = rest[0].replace(":", "");
        break;
      case "Starting":
        rest.shift();
        currentMonkey.items = rest.map((item) => item.replace(",", ""));
        break;
      case "Operation:":
        rest.splice(0, 2);
        currentMonkey.op = rest.join("");
        break;
      case "Test:":
        currentMonkey.test = rest[rest.length - 1];
        break;
      case "If":
        currentMonkey.truthy
          ? (currentMonkey.falshy = rest[rest.length - 1])
          : (currentMonkey.truthy = rest[rest.length - 1]);
        break;
      default:
        if (currInd) {
          monkeys[currInd] = { ...currentMonkey };
          currentMonkey = {
            items: null,
            op: null,
            test: null,
            truthy: null,
            falshy: null,
            inspected: 0,
          };
        }
        currInd = "";
        break;
    }
  });
  return monkeys;
};

const findMostActiveMonkeys = (data: string[]): number => {
  const monkeys = parseInput(data);
  let step = 1;
  while (step <= 20) {
    Object.keys(monkeys).forEach((monkey) => {
      const { items, op, test, truthy, falshy } = monkeys[monkey];
      items.forEach((item: string) => {
        const worryLvl = Math.floor(notEval(op.replace(/old/g, item)) / 3);
        monkeys[monkey].inspected++;
        if (worryLvl % Number(test) === 0) {
          monkeys[truthy].items.push(worryLvl);
        } else monkeys[falshy].items.push(worryLvl);
      });
      monkeys[monkey].items = [];
    });
    step++;
  }
  return Object.keys(monkeys)
    .map((monkey) => monkeys[monkey].inspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);
};

console.log(findMostActiveMonkeys(input));
