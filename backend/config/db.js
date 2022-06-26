const mongoose = require("mongoose");

const connectDb = async (req, res) => {
  try {
    const connectdb = await mongoose.connect(
      "mongodb://localhost:27017/goalsetter"
    );
    console.log(`mongodb connected on ${connectdb.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
