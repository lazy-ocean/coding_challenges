/* https://www.codewars.com/kata/59c01248bf10a47bd1000046/train/javascript
I will give you a string. You respond with "VALID" if the string meets the requirements or "INVALID" if it does not.
Passwords must abide by the following requirements:
More than 3 characters but less than 20.
Must contain only alphanumeric characters.
Must contain letters and numbers.
*/
const validPass = (password) => {
  if (!/^[a-zA-Z0-9]{4,20}$/.test(password)) return "INVALID";
  if (!/\d/.test(password)) return "INVALID";
  if (!/[a-zA-Z]/) return "INVALID";

  return "VALID";
};

console.log(validPass("Username123"));
module.exports = validPass;
