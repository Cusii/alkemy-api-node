const db = require("../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const { check, validationResult, body } = require("express-validator");

module.exports = {
  login: async (req, res, next) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ auth: false, token: null });
      }
      const { email, password } = req.body;
      const emailUser = await db.Users.findOne({ email: email });
      const token = jwt.sign({ id: emailUser.id_user }, config.secret, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({ auth: true, token });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const { first_name, las_name, email, password } = req.body;
      let passHash = await bcrypt.hashSync(password, 12);
      const user = await db.Users.create({
        first_name,
        las_name,
        email,
        password: passHash,
      });
      const token = await jwt.sign({ id: user.id_user }, config.secret, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({ auth: true, token });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },

  meProfile: async (req, res, next) => {
    try {
      const userAuth = await db.Users.findByPk(req.userId, {
        attributes: ["id_user", "first_name", "las_name", "email"],
      });
      if (!userAuth) {
        return res.status(404).send("No user found");
      }
      res.json(userAuth);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
};
