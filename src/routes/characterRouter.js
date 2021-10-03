const express = require("express");
const router = express.Router();

const characterController = require("../controllers/characterController");
const verifyToken = require("../middlewares/token/verifyToken");
const uploadImagen= require('../middlewares/uploadImagen');

router.get("/", characterController.readAll);
router.post("/create", verifyToken,uploadImagen.any(), characterController.createCharacter);
router.get("/read/:id", verifyToken, characterController.readCharacter);
router.put("/update/:id", verifyToken,uploadImagen.any(), characterController.uploadCharacter);
router.post("/delete/:id", verifyToken, characterController.deleteCharacter);

module.exports = router;
