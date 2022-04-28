const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");
const { reportsRouter } = require("./routes");

require("dotenv").config({
  path: "./config.env",
});

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/reports", reportsRouter);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running at:  ${process.env.PORT}`);
});

module.exports = server;