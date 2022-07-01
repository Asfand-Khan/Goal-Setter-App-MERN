const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./config/db.js");
const { errorHandler } = require("./middleware/errorHandler");
//rest variable
const app = express();

// db config
db();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handler
app.use(errorHandler);

// port
const PORT = 4500 || process.env.PORT;

// routes
// goals routes
app.use("/api/goals", require("./routes/goalsRouter.js"));
// users routes
app.use("/api/users", require("./routes/usersRouter"));

// app listener
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
