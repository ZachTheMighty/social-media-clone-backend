const route = require("express").Router();
const tokensController = require("../controllers/tokens_controller.js");

route.post("/", tokensController.createToken);

module.exports = route;
