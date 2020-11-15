/* https://www.codewars.com/kata/5270d0d18625160ada0000e4/train/javascript
Greed is a dice game played with five six-sided dice. Your mission, should you choose to accept it, is to score a throw according to these rules. You will always be given an array with five six-sided dice values.

 Three 1's => 1000 points
 Three 6's =>  600 points
 Three 5's =>  500 points
 Three 4's =>  400 points
 Three 3's =>  300 points
 Three 2's =>  200 points
 One   1   =>  100 points
 One   5   =>   50 point
A single die can only be counted once in each roll. For example, a given "5" can only count as part of a triplet (contributing to the 500 points) or as a single 50 points, but not both in the same roll.
*/

function score(dice) {
  let map = dice.reduce((acc, d) => {
    acc.hasOwnProperty(d) ? (acc[d] += 1) : (acc[d] = 1);
    return acc;
  }, {});
  return Object.keys(map).reduce((acc, key) => {
    if (map[key] === 3) acc += tripleScores[key];
    if (map[key] < 3) acc += scores[key] * map[key] || 0;
    if (map[key] > 3)
      acc += tripleScores[key] + (scores[key] * (map[key] - 3) || 0);
    return acc;
  }, 0);
}

const tripleScores = {
  1: 1000,
  6: 600,
  5: 500,
  4: 400,
  3: 300,
  2: 200,
};

const scores = {
  1: 100,
  5: 50,
};

console.log(score([2, 3, 3, 3, 3]));
module.exports = score;
