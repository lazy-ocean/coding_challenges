/*https://www.codewars.com/kata/52774a314c2333f0a7000688/train/javascript
Write a function called that takes a string of parentheses, and determines if the order of the parentheses is valid. The function should return true if the string is valid, and false if it's invalid.

Examples
"()"              =>  true
")(()))"          =>  false
"("               =>  false
"(())((()())())"  =>  true
*/

function validParentheses(parens) {
  let checker = 0;
  for (let i = 0; i < parens.length; i++) {
    parens[i] === "(" ? (checker += 1) : (checker -= 1);
    if (checker < 0) return false;
  }
  return checker == 0;
}

console.log(validParentheses("(())(())((()))()()(("));
module.exports = validParentheses;
