const jwt = require("jsonwebtoken");
require("dotenv").config();
const prisma = require("../lib/prisma.ts");

module.exports = (req, res, next) => {
  if (!req.headers["authorization"])
    return res.status(403).json({
      errors: "You need to log in in order to view this resource.",
      isAuth: false,
    });

  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, process.env.SECRET, async (error, payload) => {
    if (error) return res.status(403).json({ error, isAuth: false });

    const user = await prisma.user.findUnique({
      where: { id: payload.user.id },
      omit: { password: true },
      include: { posts: true, followers: true, following: true },
    });

    if (req.originalUrl === "/tokens/auth")
      return res.json({ isAuth: true, user });

    req.user = user;
    next();
  });
};
