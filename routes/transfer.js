const middlewareController = require("../controllers/middlewareControllers");
const transferController = require("../controllers/transferControllers");

const router = require("express").Router();

router.post(
  "/deposit/:id",
  middlewareController.verifyToken,
  transferController.deposit
);
router.post(
  "/withdraw/:id",
  middlewareController.verifyAccountWithdraw,
  transferController.withdraw
);
module.exports = router;
