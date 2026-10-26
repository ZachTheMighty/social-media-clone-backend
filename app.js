const express = require("express");
require("dotenv").config();

const usersRoute = require("./routes/users_route.js");
const tokensRoute = require("./routes/tokens_route.js");

const app = express();

app.use(express.json());

app.use("/users", usersRoute);
app.use("/tokens", tokensRoute);

const port = process.env.PORT;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(port);
});
