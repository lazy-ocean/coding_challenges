/*
Realize a function comparing two timestamps in ms and returning precise time in days, hours, minutes and seconds.
*/
const secInMin = 60;
const minInHour = 60;
const hoursInDay = 24;
const secInHour = minInHour * secInMin;
const secInDay = hoursInDay * secInHour;

const units = {
  d: { one: "day", multiple: "days" },
  h: { one: "hour", multiple: "hours" },
  m: { one: "minute", multiple: "minutes" },
  s: { one: "second", multiple: "seconds" },
};

const compare = (t1, t2) => {
  const timestamp = Math.abs(t1 - t2);

  const timings = {
    d: Math.floor(timestamp / secInDay),
    h: Math.floor((timestamp % secInDay) / secInHour),
    m: Math.floor((timestamp % secInHour) / secInMin),
    s: Math.floor(timestamp % secInMin),
  };

  const result = Object.keys(timings)
    .map((key) => {
      if (timings[key] <= 0) return;
      return timings[key] > 1
        ? `${timings[key]} ${units[key].multiple}`
        : `${timings[key]} ${units[key].one}`;
    })
    .filter(Boolean);

  return !result.length ? "0 seconds" : result.join(", ");
};
