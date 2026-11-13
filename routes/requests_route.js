const route = require("express").Router();
const controller = require("../controllers/requests_controller.js");

route.post("/:username", controller.createRequest);
route.delete("/:id", controller.deleteRequest);
route.put("/:id", controller.updateRequestStatus);

module.exports = route;
