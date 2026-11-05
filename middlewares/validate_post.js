const { body } = require("express-validator");
const validateResult = require("../middlewares/validate_result");

module.exports = [
  body("title").trim().notEmpty().withMessage("This field is required."),
  validateResult,
];
