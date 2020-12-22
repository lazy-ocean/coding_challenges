/*--- Day 22: Part Two ---
You lost to the small crab! Fortunately, crabs aren't very good at recursion. To defend your honor as a Raft Captain, you challenge the small crab to a game of Recursive Combat.

Recursive Combat still starts by splitting the cards into two decks (you offer to play with the same starting decks as before - it's only fair). Then, the game consists of a series of rounds with a few changes:

Before either player deals a card, if there was a previous round in this game that had exactly the same cards in the same order in the same players' decks, the game instantly ends in a win for player 1. Previous rounds from other games are not considered. (This prevents infinite games of Recursive Combat, which everyone agrees is a bad idea.)
Otherwise, this round's cards must be in a new configuration; the players begin the round by each drawing the top card of their deck as normal.
If both players have at least as many cards remaining in their deck as the value of the card they just drew, the winner of the round is determined by playing a new game of Recursive Combat (see below).
Otherwise, at least one player must not have enough cards left in their deck to recurse; the winner of the round is the player with the higher-value card.
As in regular Combat, the winner of the round (even if they won the round by winning a sub-game) takes the two cards dealt at the beginning of the round and places them on the bottom of their own deck (again so that the winner's card is above the other card). Note that the winner's card might be the lower-valued of the two cards if they won the round due to winning a sub-game. If collecting cards by winning the round causes a player to have all of the cards, they win, and the game ends.

Here is an example of a small game that would loop forever without the infinite game prevention rule:

Player 1:
43
19

Player 2:
2
29
14
During a round of Recursive Combat, if both players have at least as many cards in their own decks as the number on the card they just dealt, the winner of the round is determined by recursing into a sub-game of Recursive Combat. (For example, if player 1 draws the 3 card, and player 2 draws the 7 card, this would occur if player 1 has at least 3 cards left and player 2 has at least 7 cards left, not counting the 3 and 7 cards that were drawn.)

To play a sub-game of Recursive Combat, each player creates a new deck by making a copy of the next cards in their deck (the quantity of cards copied is equal to the number on the card they drew to trigger the sub-game). During this sub-game, the game that triggered it is on hold and completely unaffected; no cards are removed from players' decks to form the sub-game. (For example, if player 1 drew the 3 card, their deck in the sub-game would be copies of the next three cards in their deck.)
After the game, the winning player's score is calculated from the cards they have in their original deck using the same rules as regular Combat. In the above game, the winning player's score is 291.

Defend your honor as Raft Captain by playing the small crab in a game of Recursive Combat using the same two decks as before. What is the winning player's score?
*/

const fs = require("fs");
const _ = require("lodash");

let data = fs.readFileSync("day-22/data.txt", "utf8", (err, data) => {});
let input = data
  .split("\n\n")
  .map((line) => line.split("\n"))
  .map((line) => line.slice(1))
  .map((line) => line.map((num) => ~~num));

const game = (cards1, cards2) => {
  let playedCards = new Set();

  while (cards2.length > 0 && cards1.length > 0) {
    if (playedCards.has(`${cards1}#${cards2}`)) {
      return { cards: cards1, winner: 1 };
    }
    playedCards.add(`${cards1}#${cards2}`);
    let card1 = cards1.shift();
    let card2 = cards2.shift();
    let winner;
    if (cards1.length >= card1 && cards2.length >= card2) {
      let newCards1 = cards1.slice(0, card1);
      let newCards2 = cards2.slice(0, card2);
      let w = game(newCards1, newCards2);
      winner = w.winner;
    } else {
      winner = card1 > card2 ? 1 : 2;
    }
    winner == 1 ? cards1.push(card1, card2) : cards2.push(card2, card1);
  }

  return {
    winner: cards1.length > 0 ? 1 : 2,
    deck: cards1.length > 0 ? cards1 : cards2,
  };
};

let winningDeck = game(...input);
console.log(winningDeck);

let i = winningDeck.deck.length;
let score = winningDeck.deck.reduce((acc, num) => {
  acc += num * i;
  i -= 1;
  return acc;
}, 0);
console.log(score);
