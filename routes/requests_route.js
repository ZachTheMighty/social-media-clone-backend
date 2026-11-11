const route = require("express").Router();
const controller = require("../controllers/requests_controller.js");

route.post("/:username", controller.createRequest);

module.exports = route;
