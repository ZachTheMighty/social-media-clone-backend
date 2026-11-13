const { body } = require("express-validator");
const validateResult = require("./validate_result.js");
const months = require("../utils/months.js");
const year = require("../utils/get_year.js");

const empty = "This field is required.";
const alpha = "This field accepts only alphabetical characters.";
const nameLength = "Name must be between 1 and 25 characters.";

module.exports = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(empty)
    .isAlpha()
    .withMessage(alpha)
    .isLength({ min: 1, max: 25 })
    .withMessage(nameLength),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(empty)
    .isAlpha()
    .withMessage(alpha)
    .isLength({ min: 1, max: 25 })
    .withMessage(nameLength),
  body("month")
    .trim()
    .notEmpty()
    .withMessage(empty)
    .toLowerCase()
    .custom((value) => months.find((m) => m.month === value))
    .withMessage("Please enter a valid month."),
  body("day")
    .trim()
    .notEmpty()
    .withMessage(empty)
    .custom(
      (value, { req }) =>
        +value > 0 &&
        +value <= months.find((m) => m.month === req.body.month).days,
    )
    .withMessage("Please enter a valid day."),
  body("year")
    .trim()
    .notEmpty()
    .withMessage(empty)
    .custom((value) => +value <= year && +value >= year - 150)
    .withMessage("Please enter a valid year."),
  body("gender")
    .trim()
    .custom((value) => value === "male" || value === "female")
    .withMessage(empty)
    .toLowerCase(),
  validateResult,
];
