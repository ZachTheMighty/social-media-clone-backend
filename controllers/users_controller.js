const validateUser = require("../middlewares/validate_user.js");
const prisma = require("../lib/prisma.ts");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

const createUser = [
  validateUser,
  async (req, res) => {
    const { firstName, lastName, month, day, year, gender, email, password } =
      matchedData(req);

    if (await prisma.user.findUnique({ where: { email } }))
      return res
        .status(409)
        .json({ errors: "An account with email already exists." });

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        birthDate: `${month} ${day}, ${year}`,
        gender,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.json(
      await prisma.user.findUnique({
        where: { id: user.id },
        omit: { password: true },
      }),
    );
  },
];

module.exports = { createUser };
