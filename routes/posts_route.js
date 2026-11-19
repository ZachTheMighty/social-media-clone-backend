const route = require("express").Router();
const controller = require("../controllers/posts_controller.js");
const authenticate = require("../middlewares/authenticate.js");

route.use(authenticate);
route.post("/", controller.createPost);
route.post("/:id/votes/:state", controller.votePost);

module.exports = route;
