const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validationLogin = require("../middlewares/validations/validationLogin");
const verifyToken = require("../middlewares/token/verifyToken");

router.post("/login", validationLogin, authController.login);
router.post("/register", authController.register);
router.get("/me",verifyToken, authController.meProfile);

module.exports = router;
