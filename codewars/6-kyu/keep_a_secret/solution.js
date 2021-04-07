/* https://www.codewars.com/kata/5351b35ebaeb67f9110012d2/train/javascript
There's no such thing as private properties on a coffeescript object! But, maybe there are?
Implement a function createSecretHolder(secret) which accepts any value as secret and returns an object with ONLY two methods
getSecret() which returns the secret
setSecret() which sets the secret */

const createSecretHolder = (s) => {
  let secret = s;
  return {
    getSecret: () => secret,
    setSecret: (s) => (secret = s),
  };
};
const obj = createSecretHolder(5);
console.log(obj.getSecret());
obj.setSecret(2);
console.log(obj.getSecret());
