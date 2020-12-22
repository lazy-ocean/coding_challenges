/* --- Day 22: Crab Combat ---
It only takes a few hours of sailing the ocean on a raft for boredom to sink in. Fortunately, you brought a small deck of space cards! You'd like to play a game of Combat, and there's even an opponent available: a small crab that climbed aboard your raft before you left.

Fortunately, it doesn't take long to teach the crab the rules.

Before the game starts, split the cards so each player has their own deck (your puzzle input). Then, the game consists of a series of rounds: both players draw their top card, and the player with the higher-valued card wins the round. The winner keeps both cards, placing them on the bottom of their own deck so that the winner's card is above the other card. If this causes a player to have all of the cards, they win, and the game ends.

For example, consider the following starting decks:

Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10
This arrangement means that player 1's deck contains 5 cards, with 9 on top and 1 on the bottom; player 2's deck also contains 5 cards, with 5 on top and 10 on the bottom.

The first round begins with both players drawing the top card of their decks: 9 and 5. Player 1 has the higher card, so both cards move to the bottom of player 1's deck such that 9 is above 5. In total, it takes 29 rounds before a player has all of the cards.
Once the game ends, you can calculate the winning player's score. The bottom card in their deck is worth the value of the card multiplied by 1, the second-from-the-bottom card is worth the value of the card multiplied by 2, and so on. With 10 cards, the top card is worth the value on the card multiplied by 10.
Play the small crab in a game of Combat using the two decks you just dealt. What is the winning player's score?
*/

const fs = require("fs");
const _ = require("lodash");

let data = fs.readFileSync("day-22/data.txt", "utf8", (err, data) => {});
let input = data
  .split("\n\n")
  .map((line) => line.split("\n"))
  .map((line) => line.slice(1))
  .map((line) => line.map((num) => ~~num));

class Game {
  constructor() {
    this.rounds = 1;
    this.winner = "";
  }
  run(cards1, cards2) {
    let card1 = cards1.shift();
    let card2 = cards2.shift();
    if (card1 > card2) {
      cards1.push(card1, card2);
    } else if (card2 > card1) {
      cards2.push(card2, card1);
    }
    if (!cards1.length && !cards2.length) return "Botva!";
    if (!cards2.length) {
      this.winner = `First player. Round: ${this.rounds}`;
      this.rounds = 1;
      return cards1;
    }
    if (!cards1.length) {
      this.winner = `Second player. Round: ${this.rounds}`;
      this.rounds = 1;
      return cards2;
    }
    this.rounds++;
    return this.run(cards1, cards2);
  }
}

let game = new Game();
let winningDeck = game.run(...input);
console.log(game.winner);

let i = winningDeck.length;
let score = winningDeck.reduce((acc, num) => {
  acc += num * i;
  i -= 1;
  return acc;
}, 0);
console.log(score);
