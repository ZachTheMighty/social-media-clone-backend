const express = require("express");
require("dotenv").config();
const usersRoute = require("./routes/users_route.js");

const app = express();

app.use(express.json());

app.use("/users", usersRoute);

const port = process.env.PORT;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(port);
});
