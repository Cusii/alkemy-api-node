module.exports = (sequelize, datatype) => {
  let alias = "Characters";

  let cols = {
    id_character: {
      type: datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagen: {
      type: datatype.STRING,
    },
    name: {
      type: datatype.STRING,
    },
    weight: {
      type: datatype.FLOAT,
    },
    history: {
      type: datatype.STRING,
    },
  };

  let config = {
    tableName: "characters",
    timestamps: false,
  };

  let Character = sequelize.define(alias, cols, config);
  return Character;
};
