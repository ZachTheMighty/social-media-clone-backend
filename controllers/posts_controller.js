const prisma = require("../lib/prisma.ts");
const validatePost = require("../middlewares/validate_post.js");

const createPost = [
  validatePost,
  async (req, res) => {
    const post = await prisma.post.create({
      data: {
        authorId: req.user.id,
        title: req.body.title,
        content: req.body.content,
      },
    });
    res.json(post);
  },
];

module.exports = { createPost };
