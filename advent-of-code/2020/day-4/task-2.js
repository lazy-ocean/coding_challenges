/*
---- Day 4: Part Two ---
The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:

byr valid:   2002
byr invalid: 2003

hgt valid:   60in
hgt valid:   190cm
hgt invalid: 190in
hgt invalid: 190

hcl valid:   #123abc
hcl invalid: #123abz
hcl invalid: 123abc

ecl valid:   brn
ecl invalid: wat

pid valid:   000000001
pid invalid: 0123456789

Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?
*/

const fs = require("fs");

const keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const eyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

function findValid(data) {
  let valid = data.filter((pass) => {
    let passkeys = Object.keys(pass);
    return keys.every((key) => passkeys.includes(key));
  });
  let validDeep = valid.filter((pass) => {
    if (~~pass.byr > 2002 || ~~pass.byr < 1920) return false;
    if (~~pass.iyr > 2020 || ~~pass.iyr < 2010) return false;
    if (~~pass.eyr > 2030 || ~~pass.eyr < 2020) return false;
    let unit = pass.hgt.slice(-2);
    if (unit === "in") {
      if (~~pass.hgt.slice(0, -2) < 59 || ~~pass.hgt.slice(0, -2) > 76)
        return false;
    } else if (unit === "cm") {
      if (~~pass.hgt.slice(0, -2) < 150 || ~~pass.hgt.slice(0, -2) > 193)
        return false;
    } else {
      return false;
    }
    let hairRegex = /^#([a-f0-9]{6})/;
    if (!hairRegex.test(pass.hcl)) return false;
    if (!eyes.includes(pass.ecl)) return false;
    let passRegex = /^\d{9}$/;
    if (!passRegex.test(pass.pid)) return false;
    return true;
  });
  return validDeep.length;
}

let dataFunc = (input) =>
  input
    .map((pass) => pass.split(" "))
    .map((pass) => {
      return pass.reduce((acc, item) => {
        let split = item.split(":");
        acc[split[0]] = split[1];
        return acc;
      }, {});
    });

let file = fs.readFileSync("4/data.txt", "utf8", (err, data) => {});
let input = file.split("\n\n").map((line) => line.split("\n").join(" "));
let data = dataFunc(input);
console.log(findValid(data));
