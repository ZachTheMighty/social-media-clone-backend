const route = require("express").Router();
const controller = require("../controllers/comments_controller.js");

route.post("/:id/votes/:state", controller.voteComment);
route.delete("/:id", controller.deleteComment);

module.exports = route;
