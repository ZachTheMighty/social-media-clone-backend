const jwt = require("jsonwebtoken");
require("dotenv").config();
const prisma = require("../lib/prisma.ts");
const { publicUserArgs } = require("../prisma/selectors.js");

module.exports = (req, res, next) => {
  if (!req.headers["authorization"])
    return res.status(403).json({
      errors: "You need to log in in order to view this resource.",
      isAuth: false,
    });

  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, process.env.SECRET, async (error, payload) => {
    if (error) return res.status(403).json({ error, isAuth: false });

    const publicUser = await prisma.user.findUnique({
      where: { id: payload.user.id },
      ...publicUserArgs,
    });

    if (req.originalUrl === "/tokens/auth")
      return res.json({ isAuth: true, user: publicUser });

    const user = await prisma.user.findUnique({
      where: { id: payload.user.id },
    });

    req.user = user;
    next();
  });
};
