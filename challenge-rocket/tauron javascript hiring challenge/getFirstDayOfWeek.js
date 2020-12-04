/* getFirstDayOfWeek.js
Write getFirstDayOfWeek() function that takes a timestamp and returns the timestamp for the monday of the week of the argumented timestamp (monday 12:00:00 GMT+2) */

function getFirstDayOfWeek(timestamp) {
  let date = new Date(timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = date.getDate();
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let monday = day - (date.getDay() - 1);
  return Date.parse(`${monday} ${month} ${year} 12:00:00 GMT+2`);
}
