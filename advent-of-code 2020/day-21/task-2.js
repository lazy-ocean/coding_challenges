/* --- Part Two ---
Now that you've isolated the inert ingredients, you should have enough information to figure out which ingredient contains which allergen.

In the above example:

mxmxvkd contains dairy.
sqjhc contains fish.
fvjkl contains soy.
Arrange the ingredients alphabetically by their allergen and separate them by commas to produce your canonical dangerous ingredient list. (There should not be any spaces in your canonical dangerous ingredient list.) In the above example, this would be mxmxvkd,sqjhc,fvjkl.

Time to stock your raft with supplies. What is your canonical dangerous ingredient list?
*/

const fs = require("fs");
const _ = require("lodash");

let data = fs.readFileSync("day-21/data.txt", "utf8", (err, data) => {});
let allergensList = {};
let allDishes = [];
let input = data
  .split("\n")
  .map((line) => line.split("\n"))
  .reduce((acc, line) => {
    let newLines = line[0].split(/ \(/);
    let allergens = newLines[1]
      .replace("contains ", "")
      .slice(0, -1)
      .split(", ");
    let dishes = newLines[0].split(" ");
    allergens.forEach((allergen) => (allergensList[allergen] = null));
    allDishes.push(dishes);
    allergens.forEach((allergen) => {
      acc[allergen] ? acc[allergen].push(dishes) : (acc[allergen] = [dishes]);
    });
    return acc;
  }, {});
let uniqDishes = allDishes.flat();

const find = (input) => {
  let provenAllergens = {};
  Object.entries(input).forEach(([key, values]) => {
    let temp = _.intersection(...values);
    provenAllergens[key] = _.intersection(...values);
  });
  const f = ([allergen, ingredients]) => {
    if (ingredients.length === 1) {
      let temp = ingredients[0];
      Object.entries(provenAllergens).forEach(([al, ingr]) => {
        if (al !== allergen) {
          _.pull(provenAllergens[al], temp);
        }
      });
    }
    return;
  };
  while (Object.values(provenAllergens).flat().length > 8) {
    Object.entries(provenAllergens).forEach(([allergen, ingredients]) => {
      f([allergen, ingredients]);
    });
  }
  let sorted = Object.keys(provenAllergens).sort();
  return sorted.map((key) => provenAllergens[key]).join();
};

console.log(find(input));
