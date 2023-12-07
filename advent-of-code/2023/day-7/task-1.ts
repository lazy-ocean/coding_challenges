/* --- Day 7: Camel Cards ---
Your all-expenses-paid trip turns out to be a one-way, five-minute ride in an airship. (At least it's a cool airship!) It drops you off at the edge of a vast desert and descends back to Island Island.

"Did you bring the parts?"

You turn around to see an Elf completely covered in white clothing, wearing goggles, and riding a large camel.

"Did you bring the parts?" she asks again, louder this time. You aren't sure what parts she's looking for; you're here to figure out why the sand stopped.

"The parts! For the sand, yes! Come with me; I will show you." She beckons you onto the camel.

After riding a bit across the sands of Desert Island, you can see what look like very large rocks covering half of the horizon. The Elf explains that the rocks are all along the part of Desert Island that is directly above Island Island, making it hard to even get there. Normally, they use big machines to move the rocks and filter the sand, but the machines have broken down because Desert Island recently stopped receiving the parts they need to fix the machines.

You've already assumed it'll be your job to figure out why the parts stopped when she asks if you can help. You agree automatically.

Because the journey will take a few days, she offers to teach you the game of Camel Cards. Camel Cards is sort of similar to poker except it's designed to be easier to play while riding a camel.

In Camel Cards, you get a list of hands, and your goal is to order them based on the strength of each hand. A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. The relative strength of each card follows this order, where A is the highest and 2 is the lowest.

Every hand is exactly one type. From strongest to weakest, they are:

Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.

If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.

So, 33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its first card is stronger. Similarly, 77888 and 77788 are both a full house, but 77888 is stronger because its third card is stronger (and both hands have the same first and second card).

To play Camel Cards, you are given a list of hands and their corresponding bid (your puzzle input). For example:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
This example shows five hands; each hand is followed by its bid amount. Each hand wins an amount equal to its bid multiplied by its rank, where the weakest hand gets rank 1, the second-weakest hand gets rank 2, and so on up to the strongest hand. Because there are five hands in this example, the strongest hand will have rank 5 and its bid will be multiplied by 5.

So, the first step is to put the hands in order of strength:

32T3K is the only one pair and the other hands are all a stronger type, so it gets rank 1.
KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and KK677 gets rank 3.
T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so it gets rank 5 and T55J5 gets rank 4.
Now, you can determine the total winnings of this set of hands by adding up the result of multiplying each hand's bid with its rank (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). So the total winnings in this example are 6440.

Find the rank of every hand in your set. What are the total winnings?
*/

export const CARDS_ORDER = ["A", "K", "Q", "J", "T"];
export enum HANDS_TYPES {
  five = "five",
  four = "four",
  fullHouse = "fullHouse",
  three = "three",
  twoPair = "twoPair",
  onePair = "onePair",
  high = "high",
}

export const HANDS_ORDER = [
  HANDS_TYPES.five,
  HANDS_TYPES.four,
  HANDS_TYPES.fullHouse,
  HANDS_TYPES.three,
  HANDS_TYPES.twoPair,
  HANDS_TYPES.onePair,
  HANDS_TYPES.high,
];

export interface Hand {
  hand: string;
  bid: number;
  type: HANDS_TYPES;
}

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

    const map = hand.split("").reduce((acc, it) => {
      acc[it] ? (acc[it] += 1) : (acc[it] = 1);
      return acc;
    }, {});

    switch (true) {
      case Object.values(map).includes(5):
        type = HANDS_TYPES.five;
        break;
      case Object.values(map).includes(4):
        type = HANDS_TYPES.four;
        break;
      case Object.values(map).includes(3) && Object.values(map).includes(2):
        type = HANDS_TYPES.fullHouse;
        break;
      case Object.values(map).includes(3) && !Object.values(map).includes(2):
        type = HANDS_TYPES.three;
        break;
      case Object.values(map).filter((n) => n === 2).length === 2:
        type = HANDS_TYPES.twoPair;
        break;
      case Object.values(map).filter((n) => n === 2).length === 1:
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
