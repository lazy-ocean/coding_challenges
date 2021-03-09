/* https://www.codewars.com/kata/540954232a3259755d000039/train/javascript
Create the function fridayTheThirteenths that accepts a start year and an end year (inclusive), and returns all of the dates where the 13th of a month lands on a Friday in the given range of year(s).
The return value should be a string where each date is seperated by a space. The date should be formatted like 9/13/2014 where months do not have leading zeroes and are separated with forward slashes.
If no end year is given, only return friday the thirteenths during the start year.
*/
const fridayTheThirteenths = (...yrs) => {
  let years = [];
  if (yrs.length > 1) {
    const min = yrs[0];
    const max = yrs[yrs.length - 1];
    for (let i = min; i <= max; i++) {
      years.push(i);
    }
  } else years = yrs;
  const result = [];
  const months = 11;
  years.forEach((year) => {
    for (let i = 0; i <= months; i++) {
      const date = new Date(year, i, 13);
      const weekday = date.getDay();
      if (weekday === 5) result.push(date.toLocaleDateString("en-US"));
    }
  });
  return result.join(" ");
};

console.log(fridayTheThirteenths(2132, 2140));
module.exports = fridayTheThirteenths;
