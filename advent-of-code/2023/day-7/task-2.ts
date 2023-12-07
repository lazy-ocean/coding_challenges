/* --- Part Two ---
To make things a little more interesting, the Elf introduces one additional rule. Now, J cards are jokers - wildcards that can act like whatever card would make the hand the strongest type possible.

To balance this, J cards are now the weakest individual cards, weaker even than 2. The other cards stay in the same order: A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J.

J cards can pretend to be whatever card is best for the purpose of determining hand type; for example, QJJQ2 is now considered four of a kind. However, for the purpose of breaking ties between two hands of the same type, J is always treated as J, not the card it's pretending to be: JKKK2 is weaker than QQQQ2 because J is weaker than Q.

Now, the above example goes very differently:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
32T3K is still the only one pair; it doesn't contain any jokers, so its strength doesn't increase.
KK677 is now the only two pair, making it the second-weakest hand.
T55J5, KTJJT, and QQQJA are now all four of a kind! T55J5 gets rank 3, QQQJA gets rank 4, and KTJJT gets rank 5.
With the new joker rule, the total winnings in this example are 5905.

Using the new joker rule, find the rank of every hand in your set. What are the new total winnings?
*/

import { CARDS_ORDER, HANDS_ORDER, HANDS_TYPES, Hand } from "./task-1";

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2023/day-7/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n");

const parseInput = (): Hand[] => {
  const data = input.map((play) => {
    const [hand, bid] = play.split(" ");

    let type = HANDS_TYPES.high;

    let jokers = 0;

    const map = hand.split("").reduce((acc, it) => {
      if (it === "J") {
        jokers++;
        return acc;
      }
      acc[it] ? (acc[it] += 1) : (acc[it] = 1);
      return acc;
    }, {});

    switch (true) {
      case Object.values(map).includes(5):
      case jokers === 5:
      case jokers === 4:
        type = HANDS_TYPES.five;
        break;
      case Object.values(map).includes(4):
        type = jokers > 0 ? HANDS_TYPES.five : HANDS_TYPES.four;
        break;
      case Object.values(map).includes(3) && jokers === 2:
        type = HANDS_TYPES.five;
        break;
      case Object.values(map).includes(3) && Object.values(map).includes(2):
        type = jokers > 0 ? HANDS_TYPES.four : HANDS_TYPES.fullHouse;
        break;
      case Object.values(map).includes(3) && !Object.values(map).includes(2):
        type = jokers > 0 ? HANDS_TYPES.four : HANDS_TYPES.three;
        break;
      case Object.values(map).filter((n) => n === 2).length === 2:
        type = jokers > 0 ? HANDS_TYPES.fullHouse : HANDS_TYPES.twoPair;
        break;
      case Object.values(map).filter((n) => n === 2).length === 1:
        type =
          jokers === 3
            ? HANDS_TYPES.five
            : jokers === 2
            ? HANDS_TYPES.four
            : jokers === 1
            ? HANDS_TYPES.three
            : HANDS_TYPES.onePair;
        break;
      case jokers === 3:
        type = HANDS_TYPES.four;
        break;
      case jokers === 2:
        type = HANDS_TYPES.three;
        break;
      case jokers === 1:
        type = HANDS_TYPES.onePair;
        break;
      default:
        break;
    }

    return {
      hand,
      bid: Number(bid),
      type,
    };
  });
  return data;
};

const comparator = (a: Hand, b: Hand): 1 | -1 => {
  if (a.type !== b.type) return 1;
  const aHand = a.hand.split("");
  const bHand = b.hand.split("");
  for (let i = 0; i < aHand.length; i++) {
    const currA = aHand[i];
    const currB = bHand[i];
    const numA = Number(currA);
    const numB = Number(currB);
    if (Number.isNaN(numA) && Number.isNaN(numB)) {
      if (currA !== currB) {
        return CARDS_ORDER.indexOf(currA) < CARDS_ORDER.indexOf(currB) ? -1 : 1;
      }
    } else if (Number.isNaN(numA) || Number.isNaN(numB)) {
      if (currA === "J") return 1;
      if (currB === "J") return -1;
      return Number.isNaN(Number(currA)) ? -1 : 1;
    } else if (numA !== numB) return numA > numB ? -1 : 1;
  }
  return 1;
};

const findWinnings = (): number => {
  const data = parseInput();
  const sorted = data
    .sort((a, b) => HANDS_ORDER.indexOf(a.type) - HANDS_ORDER.indexOf(b.type))
    .sort((a, b) => comparator(a, b))
    .reverse()
    .reduce((acc, v, i) => {
      acc += v.bid * (i + 1);
      return acc;
    }, 0);

  return sorted;
};

console.log(findWinnings());
