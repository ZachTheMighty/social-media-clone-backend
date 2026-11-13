const prisma = require("../lib/prisma.ts");
const { publicRequest } = require("../prisma/selectors.js");

const createRequest = async (req, res) => {
  const receiver = await prisma.user.findUnique({
    where: { username: req.params.username },
  });
  const requestExists = await prisma.request.findFirst({
    where: {
      AND: {
        senderId: req.user.id,
        receiverId: receiver.id,
      },
    },
  });
  if (requestExists) {
    return res.json(
      await prisma.request.update({
        where: { id: requestExists.id },
        data: { status: "PENDING" },
        ...publicRequest,
      }),
    );
  }

  const request = await prisma.request.create({
    data: {
      senderId: req.user.id,
      receiverId: receiver.id,
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

const updateRequestStatus = async (req, res) => {
  const request = await prisma.request.update({
    where: { id: +req.params.id },
    data: { status: req.body.status },
    ...publicRequest,
  });
  if (request.status === "ACCEPTED")
    await prisma.user.update({
      where: { username: request.sender.username },
      data: {
        following: { connect: { username: request.receiver.username } },
      },
    });

  res.json(request);
};

module.exports = { createRequest, deleteRequest, updateRequestStatus };
