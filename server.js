const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/db");
const routes = require("./routes");
const authMiddleware = require("./middlewares/authMiddleware");
const cors = require("cors");

dbConnection();

const app = express();

const port = process.env.PORT || 8000;

// Middlewares

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Server Is Running 🔥");
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
