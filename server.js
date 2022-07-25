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
    process.env.DB_USER +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_CLUSTER +
    ".mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running at port " + process.env.PORT || 3000);
});

////
