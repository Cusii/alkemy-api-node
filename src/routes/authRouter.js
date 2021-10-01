const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validationLogin = require("../middlewares/validations/validationLogin");

router.post("/login", validationLogin, authController.login);
router.post("/register", authController.register);
router.get("/me", authController.meProfile);

module.exports = router;
