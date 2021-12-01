/*
--- Part Two ---
Now that you've identified which tickets contain invalid values, discard those tickets entirely. Use the remaining valid tickets to determine which field is which.

Using the valid ranges for each field, determine what order the fields appear on the tickets. The order is consistent between all tickets: if seat is the third field, it is the third field on every ticket, including your ticket.

For example, suppose you have the following notes:

class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
Based on the nearby tickets in the above example, the first position must be row, the second position must be class, and the third position must be seat; you can conclude that in your ticket, class is 12, row is 11, and seat is 13.

Once you work out which field is which, look for the six fields on your ticket that start with the word departure. What do you get if you multiply those six values together?
*/

const fs = require("fs");
const _ = require("lodash");

////// DATA MANIPULATION

let file = fs.readFileSync("day-16/data.txt", "utf8", (err, data) => {});
let input = file.split("\n\n").map((line) => line.split("\n"));
let rulesByCategories = input[0]
  .map((rule) => rule.split(":"))
  .reduce((acc, rule) => {
    let line = rule[1].split(" ");
    let nums = line[1].split("-");
    let range = { min: ~~nums[0], max: ~~nums[1] };
    let nums2 = line[3].split("-");
    let range2 = { min: ~~nums2[0], max: ~~nums2[1] };
    acc[rule[0]] = [range, range2];
    return acc;
  }, {});

let rules = _.flatten(Object.values(rulesByCategories));

let myTicket = input[1][1].split(",").map(Number);
let nearbyTickets = input[2]
  .slice(1)
  .map((ticket) => ticket.split(",").map(Number));

//////// SOLUTION

const filterInvalidTickets = (nearbyTickets, rules) => {
  return nearbyTickets.filter((ticket) => checkAgainstRules(ticket, rules));
};

const checkAgainstRules = (ticket, rules) => {
  return ticket.every((number) => {
    for (let rule of rules) {
      if (number <= rule.max && number >= rule.min) return true;
    }
  });
};

let valids = filterInvalidTickets(nearbyTickets, rules);

const splitByCategories = (tickets) => {
  let res = {};
  let ticketsByIndex = _.zip(...tickets);
  let categories = Object.keys(rulesByCategories);
  for (let i = 0; i < ticketsByIndex.length; i++) {
    for (let category of categories) {
      let filter = rulesByCategories[category];
      if (checkAgainstRules(ticketsByIndex[i], filter)) {
        !res[category] ? (res[category] = [i]) : res[category].push(i);
      }
    }
  }
  let uniq = {};

  const f = (results) => {
    let newRes = _.cloneDeep(results);
    if (!Object.keys(newRes).length) return;
    let usedCategories = Object.values(uniq);

    Object.keys(results).map((key) => {
      if (results[key].length === 1) {
        uniq[key] = results[key][0];
        newRes = _.omit(newRes, key);
      } else {
        let newValues = results[key].map((value) =>
          usedCategories.includes(value) ? false : value
        );
        newRes[key] = newValues.filter((val) => val !== false);
      }
    });
    return f(newRes);
  };
  f(res);
  let departure = Object.keys(uniq).filter((key) => key.match(/^departure/));
  let mult = 1;
  departure.forEach((key) => {
    let index = uniq[key];
    mult *= myTicket[index];
  });
  return mult;
};

console.log(splitByCategories(valids));
