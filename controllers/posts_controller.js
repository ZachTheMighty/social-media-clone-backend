const prisma = require("../lib/prisma.ts");
const validatePost = require("../middlewares/validate_post.js");
const { publicPostArgs } = require("../prisma/selectors.js");

const createPost = [
  validatePost,
  async (req, res) => {
    const post = await prisma.post.create({
      data: {
        authorId: req.user.id,
        title: req.body.title,
        content: req.body.content,
      },
      ...publicPostArgs,
    });
    res.json(post);
  },
];

const votePost = async (req, res) => {
  const postId = +req.params.id;

  const alreadyVoted = await prisma.vote.findFirst({
    where: {
      AND: [{ userId: req.user.id }, { postId }],
    },
  });

  if (!alreadyVoted)
    return res.json(
      await prisma.post.update({
        where: { id: postId },
        data: {
          votes: {
            create: { userId: req.user.id, state: req.params.state },
          },
        },
        ...publicPostArgs,
      }),
    );

  if (alreadyVoted.state !== req.params.state)
    return res.json(
      await prisma.post.update({
        where: { id: postId },
        data: {
          votes: {
            update: {
              where: { id: alreadyVoted.id },
              data: { state: req.params.state },
            },
          },
        },
        ...publicPostArgs,
      }),
    );

  res.json(
    await prisma.post.update({
      where: { id: postId },
      data: {
        votes: {
          delete: {
            id: alreadyVoted.id,
          },
        },
      },
      ...publicPostArgs,
    }),
  );
};

const deletePost = async (req, res) => {
  res.json(
    await prisma.post.delete({
      where: { id: +req.params.id },
      ...publicPostArgs,
    }),
  );
};

module.exports = { createPost, votePost, deletePost };
