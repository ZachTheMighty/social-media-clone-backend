const validateSignUp = require("../middlewares/validate_sign_up.js");
const prisma = require("../lib/prisma.ts");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const uploadImage = require("../middlewares/upload_image.js");

const createUser = [
  uploadImage,
  validateSignUp,
  async (req, res) => {
    const {
      firstName,
      lastName,
      month,
      day,
      year,
      gender,
      email,
      password,
      username,
    } = matchedData(req);

    if (await prisma.user.findUnique({ where: { email } }))
      return res
        .status(409)
        .json({ errors: "An account with email already exists." });

    if (await prisma.user.findUnique({ where: { username } }))
      return res.status(409).json({
        errors: [
          {
            msg: `The username ${username} is not available.`,
            path: "username",
          },
        ],
      });

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        birthDate: `${month} ${day}, ${year}`,
        gender,
        picture: req.imageUrl,
        email,
        password: await bcrypt.hash(password, 10),
        username,
      },
    });
    res.json(
      await prisma.user.findUnique({
        where: { id: user.id },
        omit: { id: true, password: true },
      }),
    );
  },
];

module.exports = { createUser };
