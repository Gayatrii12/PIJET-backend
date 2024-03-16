const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/userControllers");

const {
  isAuthenticated,
  validateUserData,
} = require("../middlewares/userAuth");

router.post("/signup", validateUserData, signup);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

module.exports = router;
