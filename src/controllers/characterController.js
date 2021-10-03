const db = require("../database/models");

module.exports = {
  readAll: async (req, res, next) => {
    try {
      const dataCharacter = await db.Characters.findAll({
        attributes: ["imagen", "name"],
      });
      res.json(dataCharacter);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
  createCharacter: (req, res, next) => {
    try {
      db.Characters.create({
        imagen: req.files[0].filename,
        name: req.body.name,
        weight: req.body.weight,
        history: req.body.history,
      });
      res.status(200).json("The character was created");
      console.log(req.body);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
  readCharacter: (req, res, next) => {
    try {
      db.Characters.findByPk(req.params.id).then((character) => {
        res.status(200).json(character);
      });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
  uploadCharacter: (req, res, next) => {
    try {
      db.Characters.update(
        {
          imagen: req.files[0].filename,
          name: req.body.name,
          weight: req.body.weight,
          history: req.body.history,
        },
        {
          where: {
            id_character: req.params.id,
          },
        }
      );

      res.status(200).json(req.body);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
  deleteCharacter: (req, res, next) => {
    try {
      db.Characters.destroy({
        where: {
          id_character: req.params.id,
        },
      });
      res.status(200).json("Success");
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
};
