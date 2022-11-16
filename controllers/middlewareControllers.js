const jwt = require("jsonwebtoken");
const middlewareController = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      console.log(accessToken);
      jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Invalid token");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },
  verifyTokenAndAdminAuth: async (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json("You're not allowed to delete this account");
      }
    });
  },
  verifyTokenAmount: async (req, res, next) => {
    if (req.body.amount <= 0) {
      res.status(400).json("Invalid amount");
    } else {
      next();
    }
  },
  verifyAccountWithdraw: async (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id) {
        next();
      } else {
        res.status(403).json("You're not allowed to withdraw this account");
      }
    });
  },
};
module.exports = middlewareController;
