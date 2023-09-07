const express = require("express");
const router = express.Router();
const {
  getRegister,
  getLogin,
  getLogOut,
  postRegister,
  postLogin,
} = require("../controller/authController");

router.get("/register", getRegister);

router.get("/login", getLogin);

router.post("/register", postRegister);

router.post("/login", postLogin);

router.get("/logout", getLogOut);

module.exports = router;
