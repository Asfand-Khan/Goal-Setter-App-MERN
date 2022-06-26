const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./config/db.js");
//rest variable
const app = express();

// db config
db();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 4500 || process.env.PORT;

app.use("/api/goals", require("./routes/goalsRouter.js"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
