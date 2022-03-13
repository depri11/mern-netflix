const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
try {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connect MongoDB Success");
  });
} catch (error) {
  console.log(error);
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Backend server is running! at port ${port}`);
});
