const db = require("../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const { check, validationResult, body } = require("express-validator");

module.exports = {
  //User login
  login: async (req, res, next) => {
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
  },

  //Register new user
  register: async (req, res, next) => {
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
  },

  //Look profile and more data from user
  meProfile: async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(token, config.secret);
    const userAuth = await db.Users.findByPk(decoded.id, {
      attributes: ["id_user", "first_name", "las_name", "email"],
    });
    if (!userAuth) {
      return res.status(404).send("No user found");
    }
    res.json(userAuth);
  },
};