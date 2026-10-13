const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

require("dotenv").config();

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(
  "mongodb+srv://" +
    encodeURIComponent(process.env.DB_USER) +
    ":" +
    encodeURIComponent(process.env.DB_PASSWORD) +
    "@" +
    process.env.DB_CLUSTER +
    ".mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).catch((error) => {
  console.error("MongoDB connection failed:", error.message);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("Server is running at port " + port);
});

////

