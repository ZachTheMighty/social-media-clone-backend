const { body } = require("express-validator");
const validateResult = require("./validate_result.js");
const months = require("../utils/months.js");
const year = require("../utils/get_year.js");

const empty = "This field is required.";
const alpha = "This field accepts only alphabetical characters.";
const nameLength = "Name must be between 1 and 25 characters.";
const password =
  "Password must be between 8 and 24  characters, and must contain at least one";

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
  body("email")
    .trim()
    .notEmpty()
    .withMessage(empty)
    .isEmail()
    .withMessage("Email must be in the format a@b.domain"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(empty)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(password)
    .isLength({ max: 24 })
    .withMessage(password),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(empty)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(password)
    .isLength({ max: 24 })
    .withMessage(password)
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The two passwords don't match."),
  validateResult,
];
