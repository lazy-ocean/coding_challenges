/* eslint-disable no-restricted-syntax */
/* https://www.codewars.com/kata/5f709c8fb0d88300292a7a9d/train/javascript
Some people have been killed!
You have managed to narrow the suspects down to just a few. Luckily, you know every person who those suspects have seen on the day of the murders.

Given a dictionary with all the names of the suspects and everyone that they have seen on that day and also a list of the names of the dead people return the name of the one killer.
*/

const killer = (suspectInfo, dead) => {
  for (const suspect of Object.keys(suspectInfo)) {
    if (dead.every((victim) => suspectInfo[suspect].includes(victim))) {
      return suspect;
    }
  }
};
const info = {
  James: ["Jacob", "Bill", "Lucas"],
  Johnny: ["David", "Kyle", "Lucas"],
  Peter: ["Lucy", "Kyle"],
};
const dead = ["Lucas", "Bill"];

console.log(killer(info, dead));
module.exports = killer;
