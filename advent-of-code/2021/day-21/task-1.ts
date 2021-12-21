/* eslint-disable no-restricted-syntax */
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-21/data.txt",
  "utf8",
  () => null
);

const input: number[] = dataset
  .split("\n")
  .map((item) => item.split(": ")[1])
  .map(Number);

const playGame = ([player1, player2]: number[]) => {
  // every 5 steps combination repeats, 30 / 3 = 5
  // for player one - 1+2+3 => 7+8+9 => 13+14+15 => 19+20+21 => 25+26+27
  // for player two - 4+5+6 => 10+11+12 => 16+17+18 => 22+23+24 => 28+29+30
  const pl1Dices = [6, 4, 2, 10, 8];
  const pl2Dices = [5, 3, 1, 9, 7];

  // every 10 steps everything repeats - player turns up on the same spot with the same dice, so we'll calculate only 10 steps

  const playTenTimes = (pos, dice) => {
    let points = 0;
    let step = 0;
    let currentPosition = pos;
    const pointsArr = [];
    const findDice = (steps) =>
      steps === 5 ? 0 : steps > 5 ? steps - 5 : steps;
    while (step < 10) {
      const temp =
        currentPosition + dice[findDice(step)] > 10
          ? (currentPosition + dice[findDice(step)]) % 10
          : currentPosition + dice[findDice(step)];
      pointsArr.push(temp);
      points += temp;
      currentPosition = temp;
      step++;
    }
    return { points, pointsArr };
  };
  const pl1res = playTenTimes(player1, pl1Dices);
  const pl2res = playTenTimes(player2, pl2Dices);
  const res = {
    w: pl1res.points > pl2res.points ? pl1res : pl2res,
    l: pl1res.points > pl2res.points ? pl2res : pl1res,
  };
  const lastIterSteps = Math.floor(1000 / res.w.points);
  let beforeLastIter = lastIterSteps * res.w.points;

  const countMissingSteps = (arr) => {
    let counter = 0;
    while (beforeLastIter < 1000) {
      counter++;
      beforeLastIter += arr.shift();
    }
    return counter;
  };
  const missingRolls = countMissingSteps(res.w.pointsArr);

  const overallRolls = lastIterSteps * 10 * 3 * 2 + missingRolls * 2 * 3;

  const countMissingPoints = (st) => {
    let counter = st;
    let losingSum = lastIterSteps * res.l.points;
    while (counter) {
      counter--;
      losingSum += res.l.pointsArr.shift();
    }
    return losingSum;
  };
  return overallRolls * countMissingPoints(missingRolls);
};
console.log(playGame(input));
