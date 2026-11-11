const prisma = require("../lib/prisma.ts");

const createRequest = async (req, res) => {
  const receiver = await prisma.user.findUnique({
    where: { username: req.params.username },
  });
  const request = await prisma.request.create({
    data: {
      senderId: req.user.id,
      receiverId: receiver.id,
    },
  });
  res.end();
};

module.exports = { createRequest };
