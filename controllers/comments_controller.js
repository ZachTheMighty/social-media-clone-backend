const prisma = require("../lib/prisma.ts");
const { publicPostArgs } = require("../prisma/selectors");

const voteComment = async (req, res) => {
  const commentId = +req.params.id;
  const postId = +req.body.postId;

  const alreadyVoted = await prisma.vote.findFirst({
    where: {
      AND: [{ userId: req.user.id }, { commentId }],
    },
  });

  if (!alreadyVoted)
    return res.json(
      await prisma.post.update({
        where: { id: postId },
        data: {
          comments: {
            update: {
              where: { id: commentId },
              data: {
                votes: {
                  create: { userId: req.user.id, state: req.params.state },
                },
              },
            },
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
          comments: {
            update: {
              where: { id: commentId },
              data: {
                votes: {
                  update: {
                    where: { id: alreadyVoted.id },
                    data: { state: req.params.state },
                  },
                },
              },
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
        comments: {
          update: {
            where: { id: commentId },
            data: {
              votes: {
                delete: {
                  id: alreadyVoted.id,
                },
              },
            },
          },
        },
      },
      ...publicPostArgs,
    }),
  );
};

const deleteComment = async (req, res) => {
  res.json(
    await prisma.post.update({
      where: { id: +req.body.postId },
      data: {
        comments: {
          delete: {
            id: +req.params.id,
          },
        },
      },
      ...publicPostArgs,
    }),
  );
};

const editComment = async (req, res) => {
  res.json(
    await prisma.post.update({
      where: { id: +req.body.postId },
      data: {
        comments: {
          update: {
            where: { id: +req.params.id },
            data: {
              content: req.body.content.content,
            },
          },
        },
      },
      ...publicPostArgs,
    }),
  );
};

module.exports = { voteComment, deleteComment, editComment };
