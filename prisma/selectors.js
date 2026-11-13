const publicUserOmit = {
  id: true,
  password: true,
  email: true,
};

const publicRequest = {
  id: true,
  status: true,
  sender: { omit: publicUserOmit },
  receiver: { omit: publicUserOmit },
};

const publicUserArgs = {
  omit: publicUserOmit,
  include: {
    posts: true,
    followers: { omit: publicUserOmit },
    following: { omit: publicUserOmit },
    sentRequests: { select: publicRequest },
    receivedRequests: { select: publicRequest },
  },
};

module.exports = { publicUserOmit, publicRequest, publicUserArgs };
