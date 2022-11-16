const middlewareController = require("../controllers/middlewareControllers");
const userController = require("../controllers/userControllers");

const router = require("express").Router();

router.get("/", middlewareController.verifyToken, userController.getAllUser);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);
module.exports = router;
