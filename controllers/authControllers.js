const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authController = {
  // REGISTER
  registerUser: async (req, res) => {
    try {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      const user = await newUser.save();
      const accessToken = jwt.sign(
        {
          id: user.id,
          admin: user.admin,
        },
        process.env.ACCESS_KEY,
        { expiresIn: "30d" }
      );
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Wrong username!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password!");
      }

      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          process.env.ACCESS_KEY,
          { expiresIn: "30d" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = authController;
