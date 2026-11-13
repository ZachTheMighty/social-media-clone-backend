const route = require("express").Router();
const controller = require("../controllers/users_controller.js");
const authenticate = require("../middlewares/authenticate.js");

route.post("/", controller.createUser);
route.use(authenticate);
route.get("/", controller.getAllUsers);
route.put("/:username", controller.unFollowUser);
route.put("/", controller.editUser);

module.exports = route;
