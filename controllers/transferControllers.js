const User = require("../models/User");
const transferController = {
  deposit: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      var currentBalance = user.balance;
      const amount = req.body.amount;

      const newUser = await User.findByIdAndUpdate(req.params.id, {
        balance: currentBalance + amount,
      });
      console.log(newUser);
      const { password, ...others } = newUser._doc;
      res.status(200).json({ ...others });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  withdraw: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const currentBalance = user.balance;
      if (req.body.amount > currentBalance) {
        res.status(400).json("Not enough balance");
      } else {
        const amount = req.body.amount;
        const newUser = await User.findByIdAndUpdate(req.params.id, {
          balance: currentBalance - amount,
        });
        const { password, ...others } = newUser._doc;
        res.status(200).json({ ...others });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = transferController;
