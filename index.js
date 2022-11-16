const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const transferRoute = require("./routes/transfer");
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully connected");
    }
  }
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/transfer", transferRoute);
app.get("/", (req, res) => {
  res.status(200).json("hello");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
