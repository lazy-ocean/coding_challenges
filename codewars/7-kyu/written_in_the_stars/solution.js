/* https://www.codewars.com/kata/5888a57cbf87c25c840000c6/train/javascript
Were you ever interested in the phenomena of astrology, star signs, tarot, voodoo ? (ok not voodoo that's too spooky)...
Task:
Your job for today is to finish the starSign function by finding the astrological sign, given the birth details as a Date object.
*/

const signs = {
  0: {
    20: "Capricorn",
    21: "Aquarius",
  },
  1: {
    19: "Aquarius",
    20: "Pisces",
  },
  2: {
    20: "Pisces",
    21: "Aries",
  },
  3: {
    20: "Aries",
    21: "Taurus",
  },
  4: {
    21: "Taurus",
    22: "Gemini",
  },
  5: {
    21: "Gemini",
    22: "Cancer",
  },
  6: {
    22: "Cancer",
    23: "Leo",
  },
  7: {
    23: "Leo",
    24: "Virgo",
  },
  8: {
    23: "Virgo",
    24: "Libra",
  },
  9: {
    23: "Libra",
    24: "Scorpio",
  },
  10: {
    22: "Scorpio",
    23: "Sagittarius",
  },
  11: {
    21: "Sagittarius",
    22: "Capricorn",
  },
};
const starSign = (date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const timeframe = signs[month];
  if (timeframe[day]) return timeframe[day];
  const borderDays = Object.keys(timeframe);
  return day <= borderDays[0]
    ? timeframe[borderDays[0]]
    : timeframe[borderDays[1]];
};

console.log(starSign(new Date(1994, 7, 15)));
module.exports = starSign;
