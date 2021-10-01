module.exports = (sequelize, datatype) => {
  let alias = "Users";

  let cols = {
    id_user: {
      type: datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: datatype.STRING,
    },
    las_name: {
      type: datatype.STRING,
    },
    email: {
      type: datatype.STRING,
    },
    password: {
      type: datatype.STRING,
    },
  };

  let config = {
    tableName: "Users",
    timestamps: false,
  }

  let Users = sequelize.define(alias, cols, config);
  return Users;
};