const { body } = require("express-validator");
const validateResult = require("../middlewares/validate_result");

module.exports = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("This field is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  validateResult,
];
