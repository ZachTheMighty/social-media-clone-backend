const prisma = require("../lib/prisma.ts");
const validateLogin = require("../middlewares/validate_login.js");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = [
  validateLogin,
  async (req, res) => {
    const { identifier, password } = matchedData(req);
    const vagueAssMessage =
      "The combination of the entered email/username and password don't match any user in our records.";

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) return res.status(401).json({ errors: vagueAssMessage });
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ errors: vagueAssMessage });

    jwt.sign(
      { user },
      process.env.SECRET,
      { expiresIn: "1m" },
      (error, token) => res.json({ token }),
    );
  },
];

module.exports = { createToken };
