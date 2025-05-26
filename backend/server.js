const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const consign = require("consign");

const app = express();

app.use(express.json());
const corsMiddleware = require("./config/cors");
app.use(corsMiddleware);
consign({ cwd: path.join(__dirname) })
  .then("./middlewares")
  .then("./utils")
  .then("./controllers")
  .then("./routes")
  .into(app);

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
