const publicUserOmit = {
  id: true,
  password: true,
  email: true,
};

const publicRequest = {
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  sender: { omit: publicUserOmit },
  receiver: { omit: publicUserOmit },
};

const publicPostArgs = {
  omit: { authorId: true },
  include: { author: { omit: publicUserOmit } },
};

const publicFollowArgs = {
  omit: publicUserOmit,
  include: { posts: publicPostArgs },
};

const publicUserArgs = {
  omit: publicUserOmit,
  include: {
    posts: publicPostArgs,
    followers: publicFollowArgs,
    following: publicFollowArgs,
    sentRequests: { select: publicRequest },
    receivedRequests: { select: publicRequest },
  },
};

module.exports = {
  publicUserOmit,
  publicRequest,
  publicUserArgs,
  publicPostArgs,
};
