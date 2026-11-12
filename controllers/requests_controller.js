const prisma = require("../lib/prisma.ts");

const createRequest = async (req, res) => {
  const receiver = await prisma.user.findUnique({
    where: { username: req.params.username },
  });
  const r = await prisma.request.create({
    data: {
      senderId: req.user.id,
      receiverId: receiver.id,
    },
  });
  const request = await prisma.request.findUnique({
    where: { id: r.id },
    select: {
      id: true,
      sender: { omit: { id: true, password: true, email: true } },
      receiver: { omit: { id: true, password: true, email: true } },
      status: true,
    },
  });
  res.json(request);
};
const deleteRequest = async (req, res) => {
  const request = await prisma.request.delete({
    where: { id: +req.params.id },
  });
  res.json(request);
};

module.exports = { createRequest, deleteRequest };
