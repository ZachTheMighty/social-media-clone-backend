const isLeapYear = require("./is_leap_year.js")(require("./get_year.js"));
module.exports = [
  { month: "january", days: 31 },
  { month: "february", days: isLeapYear ? 29 : 28 },
  { month: "march", days: 31 },
  { month: "april", days: 30 },
  { month: "may", days: 31 },
  { month: "june", days: 30 },
  { month: "july", days: 31 },
  { month: "august", days: 31 },
  { month: "september", days: 30 },
  { month: "october", days: 31 },
  { month: "november", days: 30 },
  { month: "december", days: 31 },
];
