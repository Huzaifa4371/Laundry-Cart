const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const UserRegister = require("./routes/userRegister");
const userSignIn = require("./routes/userSignIn");
const userData = require("./routes/userData");
const mongoose = require("mongoose");
const app = express();
const auth = require("./auth");

app.use(bodyparser.json());

app.use(cors());
app.use("/register", UserRegister);
app.use("/signIn", userSignIn);
app.use("/user", auth, userData);

const mongodburl =
  "mongodb+srv://Huzaifa:Huzaifa@cluster0.0gbtyyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongodburl)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(`erorr is ${err.message}`);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});