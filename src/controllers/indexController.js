const jwt = require("jsonwebtoken");
let db = require("../database/models")
module.exports = {
  index: (req, res) => {
    try {
      db.User.findAll({
        attributes: ['id_user','first_name','las_name','email']
      })
      .then((users) => {
        res.status(200).json({
          users: users,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
  login: (req, res) => {
    const user = {
      username: "david",
      email: "david@example.com",
    };
    jwt.sign({ user: user },"secretkey",{ expiresIn: "60s" },(err, token) => {
        res.json({ token });
      }
    );
  },
  leerdb: (req, res) => {
    /* console.log(db.User.finAll()) */
    res.json('hola')
    /* db.User.finAll()
      .then(() => res.json({users: users})) */
  }
};
