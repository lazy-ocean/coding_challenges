/* isPasswordValid.js
Validate an argumented password: it should be min 9 characters long with at least one digit and capital letter.
*/

function isPasswordValid(password) {
  let regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,}$/;
  return regex.test(password);
}
