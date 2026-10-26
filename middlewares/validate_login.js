const { body } = require("express-validator");
const validateResult = require("./validate_result.js");

const empty = "This field is required.";
const password =
  "Password must be between 8 and 24  characters, and must contain at least one";

module.exports = [
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

  validateResult,
];
