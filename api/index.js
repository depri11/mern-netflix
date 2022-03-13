const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();

try {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connect MongoDB Success");
  });
} catch (error) {
  console.log(error);
}

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/movies", movieRoute);
app.use("/api/v1/mylist", listRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Backend server is running! at port ${port}`);
});
