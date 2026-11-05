const route = require("express").Router();
const tokensController = require("../controllers/tokens_controller.js");
const authenticate = require("../middlewares/authenticate.js");

route.post("/", tokensController.createToken);
route.get("/auth", authenticate);

module.exports = route;
