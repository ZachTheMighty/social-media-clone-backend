const route = require("express").Router();
const controller = require("../controllers/comments_controller.js");

route.post("/:id/votes/:state", controller.voteComment);

module.exports = route;
